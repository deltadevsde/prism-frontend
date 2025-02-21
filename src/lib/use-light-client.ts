import { WasmLightClient } from 'prism-wasm-lightclient';
import { useCallback, useEffect, useRef, useState } from 'react';

export type LogEntry = {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
};

type LightClientEventType =
  | { type: 'sync_started'; height: number }
  | { type: 'update_da_height'; height: number }
  | { type: 'epoch_verification_started'; height: number }
  | { type: 'epoch_verified'; height: number }
  | { type: 'epoch_verification_failed'; height: number; error: string }
  | { type: 'no_epoch_found'; height: number }
  | { type: 'height_channel_closed' }
  | { type: 'get_current_commitment'; commitment: string }
  | { type: 'lumina_event'; event: any };

const START_HEIGHT = 4803885;

export const useLightClient = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(START_HEIGHT);
  const [targetHeight, setTargetHeight] = useState(0);

  const latestCurrentHeight = useRef(START_HEIGHT);
  const latestTargetHeight = useRef(0);
  const clientRef = useRef<WasmLightClient | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs((prevLogs) => {
      const newLogs = [
        ...prevLogs,
        {
          timestamp: new Date().toLocaleTimeString(),
          message,
          type,
        },
      ];
      return newLogs.length > 100 ? newLogs.slice(-100) : newLogs;
    });
  }, []);

  const updateProgress = useCallback(() => {
    // Always calculate progress, even if we haven't reached target height
    const syncRange = Math.max(1, latestTargetHeight.current - START_HEIGHT);
    const currentProgress = Math.max(0, latestCurrentHeight.current - START_HEIGHT);
    const percentage = Math.min(100, Math.floor((currentProgress / syncRange) * 100));

    setProgress(percentage);

    addLog(
      `Progress updated - Current: ${latestCurrentHeight.current}, Target: ${latestTargetHeight.current}, Progress: ${percentage}%`,
      'info'
    );
  }, [addLog]);

  const handleLightClientEvent = useCallback(
    (event: LightClientEventType) => {
      switch (event.type) {
        case 'sync_started':
          latestCurrentHeight.current = Math.max(event.height, START_HEIGHT);
          setCurrentHeight(latestCurrentHeight.current);
          addLog(`Sync started at height ${event.height}`, 'info');
          updateProgress();
          break;

        case 'update_da_height':
          latestTargetHeight.current = event.height;
          setTargetHeight(event.height);
          addLog(`DA height updated to ${event.height}`, 'info');
          updateProgress();
          break;

        case 'epoch_verified':
          latestCurrentHeight.current = event.height;
          setCurrentHeight(event.height);
          addLog(`Epoch verified at height: ${event.height}`, 'success');
          updateProgress();
          break;

        case 'epoch_verification_failed':
          addLog(`Epoch verification failed at height: ${event.height}, "${event.error}"`, 'error');
          break;

        case 'no_epoch_found':
          latestCurrentHeight.current = event.height;
          setCurrentHeight(event.height);
          addLog(`No epoch found for height: ${event.height}`, 'info');
          updateProgress();
          break;

        case 'lumina_event': {
          const lumina = event.event;
          if (!lumina || !lumina.type) {
            addLog('Lumina event: unknown event', 'info');
            break;
          }
          switch (lumina.type) {
            case 'sampling_started':
              addLog(`Lumina Event: sampling started at height: ${lumina.height}`, 'info');
              break;
            case 'peer_connected':
              addLog(`Lumina Event: peer connected, id: ${lumina.id}`, 'info');
              break;
            case 'added_header_from_header_sub':
              // This event might also indicate progress
              latestTargetHeight.current = Math.max(lumina.height, latestTargetHeight.current);
              setTargetHeight(latestTargetHeight.current);
              addLog(
                `Lumina Event: added header from header sub at height: ${lumina.height}`,
                'info'
              );
              updateProgress();
              break;
            default:
              addLog(`Lumina Event: ${lumina.type}`, 'info');
          }
          break;
        }
      }
    },
    [addLog, updateProgress]
  );

  const startLightClient = useCallback(async () => {
    if (isRunning) return;

    try {
      setIsRunning(true);
      latestCurrentHeight.current = START_HEIGHT;
      latestTargetHeight.current = START_HEIGHT;
      setCurrentHeight(START_HEIGHT);
      setTargetHeight(START_HEIGHT);
      setProgress(0);
      setLogs([]);

      addLog('Initializing WASM light client...', 'info');

      const wasm = await import('prism-wasm-lightclient');
      await wasm.default();

      const worker = new Worker(new URL('/public/worker.js', import.meta.url), { type: 'module' });
      workerRef.current = worker;

      await new Promise<void>((resolve) => {
        worker.onmessage = (event) => {
          if (event.data.type === 'ready') {
            resolve();
          }
        };
      });

      worker.onerror = (error) => {
        addLog(`Worker error: ${error.message}`, 'error');
      };

      const client = await new wasm.WasmLightClient(worker);
      clientRef.current = client;

      const channel = await client.eventsChannel();
      channelRef.current = channel;

      channel.onmessage = (messageEvent) => {
        const raw = messageEvent.data;

        if (raw && raw.formatted) {
          let logType: LogEntry['type'] = 'info';
          if (raw.event && raw.event.type === 'epoch_verification_failed') {
            logType = 'error';
          } else if (raw.event && raw.event.type === 'epoch_verified') {
            logType = 'success';
          }
          addLog(raw.formatted, logType);

          if (raw.event) {
            handleLightClientEvent(raw.event);
          }
        } else if (raw && raw.event) {
          handleLightClientEvent(raw.event);
        }
      };

      channel.onmessageerror = (error) => {
        addLog(`Channel error: ${error}`, 'error');
      };

      addLog('Light client started successfully', 'success');
      updateProgress(); // Initial progress update
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      addLog(`Failed to start light client: ${errorMessage}`, 'error');
      setIsRunning(false);

      if (channelRef.current) {
        channelRef.current.close();
        channelRef.current = null;
      }
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      clientRef.current = null;
    }
  }, [isRunning, handleLightClientEvent, addLog, updateProgress]);

  const stopLightClient = useCallback(() => {
    if (!isRunning) return;

    if (channelRef.current) {
      channelRef.current.close();
      channelRef.current = null;
    }
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    clientRef.current = null;
    setIsRunning(false);
    latestCurrentHeight.current = START_HEIGHT;
    latestTargetHeight.current = START_HEIGHT;
    setCurrentHeight(START_HEIGHT);
    setTargetHeight(START_HEIGHT);
    setProgress(0);
    addLog('Light client stopped', 'info');
  }, [isRunning, addLog]);

  useEffect(() => {
    return () => {
      if (isRunning) {
        stopLightClient();
      }
    };
  }, [isRunning, stopLightClient]);

  return {
    isRunning,
    logs,
    progress,
    currentHeight,
    targetHeight,
    startLightClient,
    stopLightClient,
  };
};

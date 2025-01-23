import { WasmLightClient } from 'prism-wasm-lightclient';
import { useCallback, useEffect, useRef, useState } from 'react';

// todo: refactor this mess

export type LogEntry = {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
};

const START_HEIGHT = 4279075;

export const useLightClient = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(START_HEIGHT);
  const [targetHeight, setTargetHeight] = useState(0);
  const [_, setClient] = useState<WasmLightClient | null>(null);

  const latestCurrentHeight = useRef(START_HEIGHT);
  const latestTargetHeight = useRef(0);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs((prev) => {
      if (prev.length > 0 && prev[prev.length - 1].message === message) {
        return prev;
      }
      return [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          message,
          type,
        },
      ];
    });
  }, []);

  const updateProgress = useCallback(() => {
    if (latestTargetHeight.current > 0 && latestCurrentHeight.current >= START_HEIGHT) {
      const syncRange = latestTargetHeight.current - START_HEIGHT;
      const currentProgress = latestCurrentHeight.current - START_HEIGHT;
      const percentage = Math.min(
        100,
        Math.max(0, Math.floor((currentProgress / syncRange) * 100))
      );
      setProgress(percentage);
    }
  }, []);

  const safeSetCurrentHeight = useCallback(
    (height: number) => {
      if (height > latestCurrentHeight.current) {
        latestCurrentHeight.current = height;
        setCurrentHeight(height);
        updateProgress();
      }
    },
    [updateProgress]
  );

  const safeSetTargetHeight = useCallback(
    (height: number) => {
      if (height > latestTargetHeight.current) {
        latestTargetHeight.current = height;
        setTargetHeight(height);
        updateProgress();
      }
    },
    [updateProgress]
  );

  const processWorkerMessage = useCallback(
    (event: MessageEvent) => {
      const data = event.data;

      if (typeof data === 'object') {
        if ('EpochVerified' in data) {
          const { verified, height } = data.EpochVerified;
          safeSetCurrentHeight(height);
          addLog(
            `${verified ? 'Verified' : 'Failed to verify'} epoch at height ${height}`,
            verified ? 'success' : 'error'
          );
        } else if ('CurrentHeight' in data) {
          const height = data.CurrentHeight;
          safeSetCurrentHeight(height);
        } else if ('SamplingResult' in data) {
          const { height, accepted } = data.SamplingResult;
          if (accepted) {
            safeSetTargetHeight(height);
            addLog(`Sampling accepted at height ${height}`, 'success');
          }
        }
      } else {
        const messageText = data.toString().toLowerCase();

        if (messageText.includes('🚀 node started')) {
          addLog('Node successfully started', 'success');
        } else if (messageText.includes('connecting to bootnodes')) {
          addLog('Connecting to bootstrap nodes...', 'info');
        } else if (messageText.includes('added header from header sub at height')) {
          const heightMatch = messageText.match(/height:\s*(\d+)/i);
          if (heightMatch) {
            const height = parseInt(heightMatch[1]);
            safeSetTargetHeight(height);
            addLog(`New header at height ${height}`, 'info');
          }
        }
      }
    },
    [addLog, safeSetCurrentHeight, safeSetTargetHeight]
  );

  const startLightClient = useCallback(async () => {
    if (isRunning) return;

    try {
      setIsRunning(true);
      latestCurrentHeight.current = START_HEIGHT;
      latestTargetHeight.current = 0;
      setCurrentHeight(START_HEIGHT);
      setTargetHeight(0);
      setProgress(0);

      addLog('Starting light client...', 'info');

      // there are some issues with Safari, its much slower somehow...
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      addLog(`Detected browser: ${isSafari ? 'Safari' : 'Other'}`, 'info');

      try {
        const wasm = await import('prism-wasm-lightclient');
        addLog('WASM module imported successfully', 'info');
        await wasm.default();
        addLog('WASM module initialized', 'info');

        const channel = new MessageChannel();
        addLog('MessageChannel created', 'info');

        try {
          const client = new wasm.WasmLightClient(channel.port2);
          setClient(client);
          addLog('Client created successfully', 'info');
          const worker = new wasm.LightClientWorker(channel.port1);
          addLog('Worker created successfully', 'info');

          channel.port1.addEventListener('error', (error) => {
            addLog(`Port1 error: ${error}`, 'error');
          });
          channel.port2.addEventListener('error', (error) => {
            addLog(`Port2 error: ${error}`, 'error');
          });

          worker.run().catch((error) => {
            addLog(`Worker run error: ${error}`, 'error');
          });

          channel.port1.onmessage = (event) => {
            try {
              processWorkerMessage(event);
            } catch (error) {
              addLog(`Message processing error: ${error}`, 'error');
            }
          };
          channel.port2.onmessage = (event) => {
            try {
              processWorkerMessage(event);
            } catch (error) {
              addLog(`Message processing error: ${error}`, 'error');
            }
          };
        } catch (error) {
          addLog(`Worker creation failed: ${error}`, 'error');
          throw error;
        }
      } catch (error) {
        addLog(`WASM initialization failed: ${error}`, 'error');
        throw error;
      }

      addLog('Light client setup complete', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      addLog(`Error: ${errorMessage}`, 'error');
      setIsRunning(false);
    }
  }, [isRunning, processWorkerMessage, addLog]);

  const stopLightClient = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    // Reset heights when stopping
    latestCurrentHeight.current = START_HEIGHT;
    latestTargetHeight.current = 0;
    setCurrentHeight(START_HEIGHT);
    setTargetHeight(0);
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

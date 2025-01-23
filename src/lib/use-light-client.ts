import { useCallback, useEffect, useRef, useState } from 'react';

// todo: refactor this mess

export type LogEntry = {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
};

const START_HEIGHT = 4312728;

export const useLightClient = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(START_HEIGHT);
  const [targetHeight, setTargetHeight] = useState(0);

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

      const wasm = await import('prism-wasm-lightclient');
      await wasm.default();

      const channel = new MessageChannel();
      const worker = await new wasm.LightClientWorker(channel.port1);
      worker.run();

      channel.port1.onmessage = processWorkerMessage;
      channel.port2.onmessage = processWorkerMessage;

      addLog('Light client setup complete', 'success');
    } catch (error: Error | unknown) {
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

import init, { LightClientWorker } from 'prism-wasm-lightclient';

Error.stackTraceLimit = 99;

async function initializeWorker() {
  try {
    await init();

    let worker = await new LightClientWorker(self, 'specter');
    self.postMessage({ type: 'ready' });

    await worker.run();
  } catch (error) {
    console.error('Worker initialization failed:', error);
    throw error;
  }
}

initializeWorker().catch((error) => {
  console.error('Worker initialization failed:', error);
  self.postMessage({ type: 'error', error: error.toString() });
});

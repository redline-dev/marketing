import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // "forks" (the default) hangs on some machines waiting for the
    // child-process worker to respond (security software / VPNs can
    // block the IPC channel). Threads use worker_threads instead of
    // subprocesses and avoid that failure mode.
    pool: "threads",
  },
});

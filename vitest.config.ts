import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // Mirror the "@/*" -> "./*" path alias from tsconfig.json so tests can
      // import shared modules the same way app and Storybook do.
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    // "forks" (the default) hangs on some machines waiting for the
    // child-process worker to respond (security software / VPNs can
    // block the IPC channel). Threads use worker_threads instead of
    // subprocesses and avoid that failure mode.
    pool: "threads",
  },
});

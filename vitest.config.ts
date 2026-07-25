import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Mirrors the "@/*" -> "./*" path mapping in tsconfig.json, which
    // Next's bundler resolves natively but Vitest's own Vite instance
    // does not pick up on its own.
    alias: {
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

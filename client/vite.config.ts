/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.ts'],
    coverage: {
      reporter: ['text', 'html', 'json'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/index.{ts,tsx}',
        'src/setupTest.ts',
      ],
    },
  },
});

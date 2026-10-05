import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const soundtrackOn = env.SOUNDTRACK_ON ?? process.env.SOUNDTRACK_ON ?? env.VITE_SOUNDTRACK_ON ?? process.env.VITE_SOUNDTRACK_ON ?? 'true';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.SOUNDTRACK_ON': JSON.stringify(soundtrackOn),
      'import.meta.env.VITE_SOUNDTRACK_ON': JSON.stringify(soundtrackOn),
      'process.env.SOUNDTRACK_ON': JSON.stringify(soundtrackOn),
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

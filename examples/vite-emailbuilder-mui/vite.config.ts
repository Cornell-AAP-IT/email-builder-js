import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_PATH ?? '/apps/email-builder/';
  const port = parseInt(env.VITE_DEV_PORT ?? '5173', 10);

  return {
    plugins: [react()],
    base,
    server: {
      port,
      strictPort: false,
    },
    preview: {
      port,
    },
  };
});

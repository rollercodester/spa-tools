/* eslint-disable sort-keys-plus/sort-keys */
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-icons': ['react-icons'],
          emotion: ['@emotion/react', '@emotion/styled'],
          'chakra-ui-react': ['@chakra-ui/react', '@chakra-ui/icons'],
          'framer-motion': ['framer-motion'],
          'prism-react-renderer': ['prism-react-renderer'],
          'console-feed': ['console-feed'],
          'spa-tools': [
            '@spa-tools/api-client',
            '@spa-tools/core-router',
            '@spa-tools/interaction-hooks',
            '@spa-tools/runtime-config',
            '@spa-tools/utilities',
          ],
        },
      },
    },
  },
  plugins: [splitVendorChunkPlugin(), react()],
  resolve: {
    alias: {
      showcase: resolve(__dirname, 'src'),
    },
  },
});

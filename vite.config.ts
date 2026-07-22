/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'CrossConvert',
        short_name: 'CrossConvert',
        description: 'Convert fitness movements, distances, weights, and barbell percentages.',
        theme_color: '#33618f',
        background_color: '#f2f1f6',
        display: 'standalone',
        orientation: 'portrait',
        id: '.',
        scope: '.',
        start_url: '.',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ttf,woff2}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    restoreMocks: true,
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});

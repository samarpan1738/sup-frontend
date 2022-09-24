import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  publicDir: '../public',
  plugins: [
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Sup',
        },
      },
    }),
    react({
        // Use React plugin in all *.jsx and *.tsx files
        include: '**/*.{jsx,tsx,js}',
      }),
  ],
});
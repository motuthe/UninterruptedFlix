import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import manifest from "./src/manifest"

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  base: './',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/popup.html'),
        content: resolve(__dirname, 'src/content/content.ts'),
        popup_css: resolve(__dirname, 'src/scss/popup.scss'),
      },
      output: {
        entryFileNames: `assets/js/[name].js`,
        // chunkFileNames: `assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name) {
            if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetInfo.name)) {
              return 'assets/images/[name].[ext]';
            }
            if (/\.css$/.test(assetInfo.name)) {
              return 'assets/css/[name].[ext]';
            }
            return 'assets/[name].[ext]';
          }
          return 'assets/[name].[ext]';
        }
      },
    },
  },
  plugins: [react(), crx({ manifest })],
})
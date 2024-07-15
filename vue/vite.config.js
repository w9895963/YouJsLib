// FILE: vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      autoImportComponentCase: 'combined'
    })
  ],
  //多个入口
  build: {
    rollupOptions: {
      input: {
        数据统计报表: './所有插件/数据统计报表/index.html',
        // index: './index.html',
        // index2: './index2.html',
      }
    }
  },
  //端口
  server: {
    port: 3001
  }
})

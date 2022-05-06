import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

const path = require('path')

export default defineConfig({
    plugins: [
        vue(),
        vuetify({
            autoImport: true
        }),
        vueI18n({
            include: path.resolve(__dirname, '/src/locales/**')
        })
    ],
    define: {'process.env': {}},
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})

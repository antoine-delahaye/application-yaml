import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

const path = require('path')

export default defineConfig({
    plugins: [
        vue(),
        vuetify({
            autoImport: true
        }),
        vueI18n({
            include: path.resolve(__dirname, '/src/locales/**'),
            globalSFCScope: false
        })
    ],
    define: {
        'process.env': {}
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})

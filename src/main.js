import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {createI18n, useI18n} from 'vue-i18n'
import {createPinia} from 'pinia'
import {createVuetify} from 'vuetify'
import {createVueI18nAdapter} from 'vuetify/locale/adapters/vue-i18n'
import {JsonViewer as jsonviewer} from 'vue3-json-viewer'

import App from '/src/App.vue'
import Home from '/src/views/Home.vue'
import Application from '/src/views/Application.vue'
import CompositeReferences from '/src/views/CompositeReferences.vue'
import References from '/src/views/References.vue'
import DataTypes from '/src/views/DataTypes.vue'
import Visualization from '/src/views/Visualization.vue'
import Download from '/src/views/Download.vue'

import fr from '/src/locales/fr.json'
import en from '/src/locales/en.json'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import {inrae} from '/src/styles/theme'

import 'vue3-json-viewer/dist/index.css'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/application', component: Application},
        {path: '/references', component: References},
        {path: '/data-types', component: DataTypes},
        {path: '/composite-references', component: CompositeReferences},
        {path: '/visualization', component: Visualization},
        {path: '/download', component: Download}
    ]
})

const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    messages: {fr, en}
})

const pinia = createPinia()

const vuetify = createVuetify({
    locale: createVueI18nAdapter({
        i18n,
        useI18n
    }),
    theme: {
        defaultTheme: 'inrae',
        themes: {
            inrae
        }
    }
})

app.use(router)
app.use(i18n)
app.use(pinia)
app.use(vuetify)
app.use(jsonviewer)
app.mount('#app')

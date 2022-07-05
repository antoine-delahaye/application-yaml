<script>
  import {useI18n} from 'vue-i18n'
  import {useCookies} from 'vue3-cookies'

  import {useYamlStore} from '/src/store/yaml'

  import '/index.css'

  export default {
    setup() {
      const {t, locale} = useI18n()
      const yamlStore = useYamlStore()
      const {cookies} = useCookies()
      return {t, locale, yamlStore, cookies}
    },

    data: () => ({
      routes: [
        {name: 'application', to: '/application'},
        {name: 'references', to: '/references'},
        {name: 'dataTypes', to: '/data-types'},
        {name: 'compositeReferences', to: '/composite-references'},
        {name: 'visualization', to: '/visualization'},
        {name: 'download', to: '/download'},
      ],
      drawer: true,
      hidden: false
    }),

    mounted() {
      if (this.cookies.isKey('locale')) {
        this.locale = this.cookies.get('locale')
      } else {
        this.cookies.set('locale', this.locale)
      }
    },

    watch: {
      $route(to) {
        if (to.path === '/') {
          this.drawer = false
          this.hidden = true
        } else {
          this.drawer = true
          this.hidden = false
        }
      },
      locale(locale) {
        this.cookies.set('locale', locale)
      }
    }
  }
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon icon="mdi-menu" @click.stop="drawer = !drawer" :hidden="hidden"/>
      <v-img id="logo" src="/src/assets/logo_white.svg" class="ml-3"/>
      <v-spacer/>
      <div>
        <v-btn id="home" :hidden="hidden" to="/">
          <v-icon size="large">mdi-home</v-icon>
        </v-btn>
        <v-menu :anchor="'bottom'">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <v-icon size="large">mdi-chevron-down</v-icon>
              <v-icon size="large">mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list nav>
            <v-list-item active-color="primary" :active="locale === 'fr'" @click="locale = 'fr'"
                         :title="t('fr')"/>
            <v-list-item active-color="primary" :active="locale === 'en'" @click="locale = 'en'"
                         :title="t('en')"/>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <template v-for="route in routes">
          <v-list-item v-if="['compositeReferences'].includes(route.name)"
                       prepend-icon="mdi-chevron-right" active-color="primary" :to="route.to"
                       :title="t('nav.'+ route.name )" disabled/>
          <v-list-item v-else prepend-icon="mdi-chevron-right" active-color="primary" :to="route.to"
                       :title="t('nav.'+ route.name )"/>
        </template>
      </v-list>
    </v-navigation-drawer>

    <router-view/>

  </v-app>
</template>

<style>
  body {
    font-family: "Avenir Next Pro", sans-serif;
  }

  .v-card-title, .v-card-subtitle, .v-navigation-drawer .v-list-item-title, .v-btn, th {
    font-family: "Raleway", sans-serif;
  }

  header img {
    width: auto !important;
  }

  .gap-1 {
    gap: 0.25rem;
  }

  .gap-3 {
    gap: 1rem;
  }
</style>

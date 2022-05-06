<script>
  import {useI18n} from 'vue-i18n'
  import {JsonViewer} from 'vue3-json-viewer'

  import {useYamlStore} from '/src/store/yaml'

  import 'vue3-json-viewer/dist/index.css'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    components: {
      JsonViewer
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-card>
        <v-card-title v-text="t('visualization.title')"/>
        <v-card-content>
          <JsonViewer :value="yamlStore.getYaml"/>
        </v-card-content>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
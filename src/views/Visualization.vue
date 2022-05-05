<script>
  import {JsonViewer} from 'vue3-json-viewer'

  import 'vue3-json-viewer/dist/index.css'

  export default {
    data() {
      return {
        t: this.i18n.t,
      }
    },

    props: {
      i18n: {
        type: Object,
        required: true
      },
      yamlStore: {
        type: Object,
        required: true
      }
    },

    components: {
      JsonViewer
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <JsonViewer :value="yamlStore.getYaml"/>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
<script>
  import {useI18n} from 'vue-i18n'
  import {Document} from 'yaml'
  import {saveAs} from 'file-saver'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    data() {
      return {
        filename: null
      }
    },

    methods: {
      download() {
        if (this.filename !== null) {
          const file = new Document()
          file.contents = this.yamlStore.getYaml
          saveAs(new Blob([file], {type: 'application/x-yaml;charset=utf-8'}), this.filename + '.yaml')
        }
      }
    }
  }
</script>

<template>
  <v-main class="d-flex align-center">
    <v-container fluid>
      <v-card max-width="40rem" class="mx-auto">
        <v-card-title v-text="t('download.title')"/>
        <v-card-subtitle v-text="t('download.subtitle')"/>
        <v-card-content>
          <v-form>
            <v-text-field :label="t('download.label')" :placeholder="t('download.placeholder')"
                          variant="outlined" color="primary" v-model="filename"/>
          </v-form>
        </v-card-content>
        <v-card-actions class="d-flex justify-center">
          <v-btn prepend-icon="mdi-download" color="primary" @click="download">
            {{ t('button.download') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
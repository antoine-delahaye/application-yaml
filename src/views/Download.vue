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
        inputRules: [
          (v) => !!v || this.t('rule.required')
        ]
      }
    },

    methods: {
      download() {
        const file = new Document()
        file.contents = this.yamlStore.getYaml
        saveAs(new Blob([file], {type: 'application/x-yaml;charset=utf-8'}), this.yamlStore.application.name + '.yaml')
      }
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-alert type="info" border>
        <v-alert-title v-text="t('alert.info')"/>
        {{ t('alert.download') }}
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-card max-width="40rem" class="mx-auto">
        <v-card-title v-text="t('download.title')"/>
        <v-card-subtitle v-text="t('download.subtitle')"/>
        <v-card-actions class="d-flex justify-center">
          <v-tooltip location="bottom">
            <template v-slot:activator="{props}">
              <v-btn prepend-icon="mdi-download" color="primary" @click="download" v-bind="props">
                {{ t('button.download') }}
              </v-btn>
            </template>
            <span v-text="t('tooltip.download')"/>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
<script>
  import {useI18n} from 'vue-i18n'
  import {parseDocument} from 'yaml'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    data() {
      return {
        isSelecting: false,
        selectedFile: null
      }
    },

    methods: {
      handleFileImport() {
        this.isSelecting = true
        window.addEventListener('focus', () => {
          this.isSelecting = false
        }, {once: true})
        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedFile = e.target.result
          this.yamlStore.resetYaml()
          this.yamlStore.setYaml(parseDocument(this.selectedFile).toJSON())
          if (this.yamlStore.application.internationalizationName === undefined) {
            this.yamlStore.application['internationalizationName'] = {
              fr: null,
              en: null
            }
          }
        }
        reader.readAsText(e.target.files[0])
        this.$router.push('/application')
      }
    }
  }
</script>

<template>
  <v-main class="d-flex align-center">
    <v-container fluid>
      <v-card max-width="40rem" class="mx-auto">
        <v-card-title v-text="t('home.title')"/>
        <v-card-content v-text="t('home.content')"/>
        <v-card-actions class="d-flex justify-center">
          <input id="import" ref="uploader" hidden type="file" @change="onFileChanged" accept=".yml, .yaml"/>
          <v-btn prepend-icon="mdi-upload" color="primary" :loading="isSelecting" @click="handleFileImport">
            {{ t('button.upload', {accepted: '(.yaml)'}) }}
          </v-btn>
          <v-btn id="new" prepend-icon="mdi-plus" color="primary" @click="yamlStore.resetYaml" to="/application">
            {{ t('button.new') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
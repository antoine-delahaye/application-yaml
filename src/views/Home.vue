<script>
  import {useI18n} from 'vue-i18n'
  import {parseDocument} from 'yaml'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'

  import DefaultLanguage from '/src/components/DefaultLanguage.vue'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      const {application} = storeToRefs(yamlStore)
      return {t, yamlStore, application}
    },

    data() {
      return {
        isSelecting: false,
        languageDialog: false
      }
    },

    components: {
      DefaultLanguage
    },

    methods: {
      handleFileImport() {
        this.yamlStore.resetYaml()
        this.isSelecting = true
        window.addEventListener('focus', () => {
          this.isSelecting = false
          if (!this.application.name) {
            this.languageDialog = false
          }
        }, {once: true})
        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const selectedFile = e.target.result
          this.yamlStore.resetYaml()
          this.yamlStore.setYaml(parseDocument(selectedFile).toJSON())
          if (!this.application) {
            this.application = {
              name: null
            }
          }
          if (!this.application.defaultLanguage) {
            this.languageDialog = true
          } else {
            this.checkFile()
          }
        }
        reader.readAsText(e.target.files[0])
      },
      checkFile() {
        if (!this.application.version) {
          this.application['version'] = 1
        } else {
          this.application.version++
        }
        if (!this.application.internationalizationName) {
          this.application['internationalizationName'] = {
            fr: null,
            en: null
          }
          this.application.internationalizationName[this.yamlStore.getLanguage] = this.application.name
        }
        this.$router.push('application')
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
          <v-tooltip location="bottom">
            <template v-slot:activator="{props}">
              <input id="import" ref="uploader" hidden type="file" @change="onFileChanged" accept=".yml, .yaml"/>
              <v-btn prepend-icon="mdi-upload" color="primary" :loading="isSelecting" @click="handleFileImport" v-bind="props">
                {{ t('button.upload', {accepted: '(.yaml)'}) }}
                <DefaultLanguage v-model="languageDialog" :is-new-file="false" @language-set="checkFile"
                                 @close-dialog="languageDialog = false"/>
              </v-btn>
            </template>
            <span v-text="t('tooltip.importYAML')"/>
          </v-tooltip>
          <v-tooltip v-if="application.name" location="bottom">
            <template v-slot:activator="{props}">
              <v-btn prepend-icon="mdi-pencil" color="primary" to="application" v-bind="props">
                {{ t('button.continue', ["d'éditer", "editing"]) }}
              </v-btn>
            </template>
            <span v-text="t('tooltip.continueEditing')"/>
          </v-tooltip>
          <v-tooltip location="bottom">
            <template v-slot:activator="{props}">
              <v-btn id="new" prepend-icon="mdi-plus" color="primary" v-bind="props">
                {{ t('button.new') }}
                <DefaultLanguage/>
              </v-btn>
            </template>
            <span v-text="t('tooltip.newFile')"/>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
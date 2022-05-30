<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'
  import {parseDocument} from 'yaml'

  import Reference from '/src/components/Reference.vue'
  import DeleteAlert from '/src/components/DeleteAlert.vue'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const {application, references} = storeToRefs(useYamlStore())
      return {t, application, references}
    },

    data() {
      return {
        selectedKey: "null",
        isSelecting: false,
        selectedFile: null
      }
    },

    components: {
      Reference,
      DeleteAlert
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
          this.references = (parseDocument(this.selectedFile).toJSON()).references
        }
        reader.readAsText(e.target.files[0])
      }
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-alert type="info" border>
        <v-alert-title v-text="t('alert.info')"/>
        {{ t('alert.references') }}
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-card>
        <v-card-title v-text="t('references.title')"/>
        <v-card-content>
          <v-table>
            <thead>
            <tr>
              <th v-text="t('references.referenceName')"/>
              <th v-text="t('references.columnsNumber')"/>
              <th v-text="t('references.constraintsNumber')"/>
              <th v-text="t('references.keyColumns')"/>
              <th v-text="'Actions'"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(value, key) in references">
              <td v-if="application.defaultLanguage === 'fr'">
                {{ value.internationalizationName.fr }}
              </td>
              <td v-else>
                {{ value.internationalizationName.en }}
              </td>
              <td v-if="value.validations !== undefined">
                {{ Object.keys(value.validations).length }}
              </td>
              <td v-else>
                0
              </td>
              <td>
                {{ Object.keys(value.columns).length }}
              </td>
              <td>
                {{ value.keyColumns.join(', ') }}
              </td>
              <td class="d-flex align-center gap-3">
                <v-btn size="small" color="error">
                  <v-icon icon="mdi-delete"/>
                  <DeleteAlert :selected-key="key" :is-reference="true" :locale="['référentiel', 'reference']"/>
                </v-btn>
                <v-btn size="small" color="primary">
                  <v-icon icon="mdi-pencil"/>
                  <Reference :reference-name="key"/>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-content>
      </v-card>
    </v-container>
    <v-container fluid class="d-flex flex-wrap justify-end gap-3 fabs">
      <input ref="uploader" hidden type="file" @change="onFileChanged" accept=".yml, .yaml"/>
      <v-btn id='uploadReferentiel' prepend-icon="mdi-upload" color="primary" rounded="pill" size="large" :loading="isSelecting"
             @click="handleFileImport">
        {{ t('button.upload', {accepted: '(.yaml)'}) }}
      </v-btn>
      <v-btn id='addReferentiel' prepend-icon="mdi-plus" color="primary" rounded="pill" size="large">
        {{ t('button.reference') }}
        <Reference :reference-name="null"/>
      </v-btn>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
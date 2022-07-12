<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

  import DataType from '/src/components/DataType.vue'
  import DeleteAlert from '/src/components/DeleteAlert.vue'

  import {useYamlStore} from '/src/store/yaml'
  import {parseDocument} from "yaml";

  export default {
    setup() {
      const {t} = useI18n()
      const {dataTypes} = storeToRefs(useYamlStore())
      return {t, dataTypes}
    },

    data() {
      return {
        selectedKey: null,
        isSelecting: false,
        selectedFile: null
      }
    },

    components: {
      DataType,
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
          this.dataTypes = (parseDocument(this.selectedFile).toJSON()).dataTypes
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
        {{ t('alert.dataTypes') }}
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-card>
        <v-card-title v-text="t('dataTypes.title')"/>
        <v-card-content>
          <v-table>
            <thead>
            <tr>
              <th v-text="t('dataTypes.dataTypeName')"/>
              <th v-text="'Actions'"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(_, key) in dataTypes">
              <td>
                {{ key }}
              </td>
              <td class="d-flex align-center gap-3">
                <v-btn size="small" color="error">
                  <v-icon icon="mdi-delete"/>
                  <DeleteAlert :selected-key="key" :is-reference="false"/>
                </v-btn>
                <v-btn size="small" color="primary">
                  <v-icon icon="mdi-pencil"/>
                  <DataType :data-type-name="key"/>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-content>
      </v-card>
    </v-container>
    <v-container fluid class="d-flex flex-wrap justify-end gap-3">
      <input ref="uploader" hidden type="file" @change="onFileChanged" accept=".yml, .yaml"/>
      <v-btn prepend-icon="mdi-upload" color="primary" rounded="pill" size="large" :loading="isSelecting"
             @click="handleFileImport">
        {{ t('button.upload', {accepted: '(.yaml)'}) }}
      </v-btn>
      <v-btn prepend-icon="mdi-plus" color="primary" rounded="pill" size="large">
        {{ t('button.dataType') }}
        <DataType :data-type-name="selectedKey"/>
      </v-btn>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
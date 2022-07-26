<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

  import DataType from '/src/components/DataType.vue'
  import DeleteAlert from '/src/components/DeleteAlert.vue'
  import RowNumber from '/src/components/RowNumber.vue'

  import {useYamlStore} from '/src/store/yaml'

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
        selectedFile: null,
        dataTypeDialog: false,
        rowNumberDialog: false,
        csvData: null,
        data: null
      }
    },

    components: {
      DataType,
      DeleteAlert,
      RowNumber
    },

    methods: {
      handleFileImport() {
        this.isSelecting = true
        this.rowNumberDialog = true
        this.csvData = null
        this.data = null
        window.addEventListener('focus', () => {
          this.isSelecting = false
          if (!this.csvData) {
            this.rowNumberDialog = false
          }
        }, {once: true})
        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.csvData = e.target.result
        }
        reader.readAsText(e.target.files[0])
      },
      getRowData(n) {
        this.data = this.csvData.split('\n').map(line => line.split(';'))[n - 1]
        this.rowNumberDialog = false
        this.dataTypeDialog = true
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
      <v-tooltip location="bottom">
        <template v-slot:activator="{props}">
          <input ref="uploader" hidden type="file" @change="onFileChanged" accept=".csv"/>
          <v-btn prepend-icon="mdi-upload" color="primary" rounded="pill" size="large" v-bind="props"
                 :loading="isSelecting"
                 @click="handleFileImport">
            {{ t('button.upload', {accepted: '(.csv)'}) }}
            <RowNumber v-model="rowNumberDialog" :title="['contenant les types de données', 'containing data types']"
                       @row-selected="getRowData" @cancel-action="dataTypeDialog = false; rowNumberDialog = false"/>
            <DataType v-model="dataTypeDialog" :data="data" :activator="''" @close-dialog="dataTypeDialog = false"/>
          </v-btn>
        </template>
        <span v-text="t('tooltip.importCSV')"/>
      </v-tooltip>
      <v-tooltip location="bottom">
        <template v-slot:activator="{props}">
          <v-btn id="addReference" prepend-icon="mdi-plus" color="primary" rounded="pill" size="large" v-bind="props">
            {{ t('button.dataType') }}
          </v-btn>
          <DataType/>
        </template>
        <span v-text="t('tooltip.newDataType')"/>
      </v-tooltip>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
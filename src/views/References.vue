<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

  import Reference from '/src/components/Reference.vue'
  import DeleteAlert from '/src/components/DeleteAlert.vue'
  import RowNumber from '/src/components/RowNumber.vue'

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
        columns: null,
        columnsTemp: null,
        referenceDialog: false,
        rowNumberDialog: false
      }
    },

    components: {
      Reference,
      DeleteAlert,
      RowNumber
    },

    methods: {
      handleFileImport() {
        this.isSelecting = true
        this.columnsTemp = null
        this.columns = null
        window.addEventListener('focus', () => {
          this.isSelecting = false
          if (!this.columnsTemp) {
            this.rowNumberDialog = false
            this.referenceDialog = false
          }
          /*if (!this.columns) {
            this.referenceDialog = false
          }*/
        }, {once: true})
        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.columnsTemp = e.target.result
        }
        reader.readAsText(e.target.files[0])
      },
      selectColumns(n) {
        this.columns = this.columnsTemp.split('\n').map(line => line.split(';'))[n - 1]
        this.rowNumberDialog = false
        this.referenceDialog = true
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
              <td v-if="value.internationalizationName === undefined">
                {{ key }}
              </td>
              <td v-else-if="application.defaultLanguage === 'fr'">
                {{ value.internationalizationName.fr }}
              </td>
              <td v-else>
                {{ value.internationalizationName.en }}
              </td>
              <td>
                {{ Object.keys(value.columns).length }}
              </td>
              <td v-if="value.validations !== undefined">
                {{ Object.keys(value.validations).length }}
              </td>
              <td v-else>
                0
              </td>
              <td>
                {{ value.keyColumns.join(', ') }}
              </td>
              <td class="d-flex align-center gap-3">
                <v-btn size="small" color="error">
                  <v-icon icon="mdi-delete"/>
                  <DeleteAlert :selected-key="key"/>
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
    <v-container fluid class="d-flex flex-wrap justify-end gap-3">
      <v-tooltip location="bottom">
        <template v-slot:activator="{props}">
          <input ref="uploader" hidden type="file" @change="onFileChanged" accept=".csv"/>
          <v-btn prepend-icon="mdi-upload" color="primary" rounded="pill" size="large" v-bind="props"
                 :loading="isSelecting"
                 @click="handleFileImport">
            {{ t('button.upload', {accepted: '(.csv)'}) }}
            <RowNumber v-model="rowNumberDialog" :title="['contenant les entêtes de colonnes', 'containing column headers']"
                       @column="selectColumns" @cancel-action="referenceDialog = false; rowNumberDialog = false"/>
            <Reference v-model="referenceDialog" :columns="columns" @close-dialog="referenceDialog = false"/>
          </v-btn>
        </template>
        <span v-text="t('tooltip.importCSV')"/>
      </v-tooltip>
      <v-tooltip location="bottom">
        <template v-slot:activator="{props}">
          <v-btn id="addReference" prepend-icon="mdi-plus" color="primary" rounded="pill" size="large" v-bind="props">
            {{ t('button.reference') }}
            <Reference/>
          </v-btn>
        </template>
        <span v-text="t('tooltip.newReference')"/>
      </v-tooltip>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
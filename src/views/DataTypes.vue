<script>
  import {useI18n} from 'vue-i18n'

  import DataType from '/src/components/DataType.vue'
  import DeleteAlert from '/src/components/DeleteAlert.vue'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    data() {
      return {
        editDataTypesDialog: false,
        addDataTypesDialog: false,
        deleteAlertDialog: false,
        selectedKey: null
      }
    },

    components: {
      DataType,
      DeleteAlert
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
              <th class="text-left" v-text="t('dataTypes.dataTypeName')"/>
              <th class="text-left" v-text="'Actions'"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(_, key) in yamlStore.dataTypes">
              <td>
                {{ key }}
              </td>
              <td class="d-flex align-center gap-3">
                <v-btn size="small" color="error">
                  <v-icon icon="mdi-delete"/>
                  <DeleteAlert :selected-key="key" :is-reference="false" :locale="['type de données', 'data type']"/>
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
  </v-main>
  <v-container fluid class="d-flex justify-end gap-3">
    <v-btn prepend-icon="mdi-upload" color="primary" rounded="pill" size="large">
      {{ t('button.upload') }}
    </v-btn>
    <v-btn prepend-icon="mdi-plus" color="primary" rounded="pill" size="large">
      {{ t('button.dataType') }}
      <DataType v-model="addDataTypesDialog" @close="addDataTypesDialog = false" activator="parent"
                :data-type-name="selectedKey"/>
    </v-btn>
  </v-container>
</template>

<style scoped>
</style>
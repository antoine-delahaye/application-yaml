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
      <v-card>
        <v-card-title>
          {{ t('dataTypes.title') }}
          <div class="d-flex gap-1 ml-auto">
            <v-btn prepend-icon="mdi-pencil" color="primary" class="mr-3" :disabled="selectedKey === null">
              {{ t('button.edit') }}
              <DataType v-model="editDataTypesDialog" @close="editDataTypesDialog = false" activator="parent" :data-type-name="selectedKey"/>
            </v-btn>
            <v-btn prepend-icon="mdi-delete" color="error" :disabled="selectedKey === null">
              {{ t('button.delete') }}
              <DeleteAlert v-model="deleteAlertDialog" @close="deleteAlertDialog = false" activator="parent" :locale="['type de données', 'data type']" :is-reference="false" :selected-key="selectedKey"/>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-content>
          <v-table>
            <thead>
            <tr>
              <th/>
              <th class="text-left" v-text="t('dataTypes.table.dataTypeName')"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(_, key) in yamlStore.dataTypes">
              <td>
                <v-checkbox color="primary" :value="key" v-model="selectedKey" hide-details/>
              </td>
              <td>
                {{ key }}
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
      <DataType v-model="addDataTypesDialog" @close="addDataTypesDialog = false" activator="parent" :data-type-name="selectedKey"/>
    </v-btn>
  </v-container>
</template>

<style scoped>
</style>
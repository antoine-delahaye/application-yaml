<script>
  import DataType from '/src/components/DataType.vue'

  export default {
    data() {
      return {
        t: this.i18n.t,
        editDataTypesDialog: false,
        addDataTypesDialog: false,
        selectedKey: null
      }
    },

    props: {
      i18n: {
        type: Object,
        required: true
      },
      yamlStore: {
        type: Object,
        required: true
      }
    },

    components: {
      DataType
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
              <DataType v-model="editDataTypesDialog" @close="editDataTypesDialog = false" activator="parent" :i18n="{t}" :yaml-store="yamlStore" :data-type-name="selectedKey"/>
            </v-btn>
            <v-btn prepend-icon="mdi-delete" color="error" @click="delete yamlStore.dataTypes[selectedKey]"
                   :disabled="selectedKey === null">
              {{ t('button.delete') }}
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
      <DataType v-model="addDataTypesDialog" @close="addDataTypesDialog = false" activator="parent" :i18n="{t}" :yaml-store="yamlStore" :data-type-name="selectedKey"/>
    </v-btn>
  </v-container>
</template>

<style scoped>
</style>
<script>
  import {useI18n} from 'vue-i18n'
  import Reference from '/src/components/Reference.vue'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    data() {
      return {
        editReferenceDialog: false,
        addReferenceDialog: false,
        selectedKey: null
      }
    },

    components: {
      Reference
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-card>
        <v-card-title>
          {{ t('references.title') }}
          <div class="d-flex gap-1 ml-auto">
            <v-btn prepend-icon="mdi-pencil" color="primary" class="mr-3" :disabled="selectedKey === null">
              {{ t('button.edit') }}
              <Reference v-model="editReferenceDialog" @close="editReferenceDialog = false" activator="parent" :reference-name="selectedKey"/>
            </v-btn>
            <v-btn prepend-icon="mdi-delete" color="error" @click="delete yamlStore.references[selectedKey]" :disabled="selectedKey === null">
              {{ t('button.delete') }}
            </v-btn>
          </div>
        </v-card-title>
        <v-card-content>
          <v-table>
            <thead>
            <tr>
              <th/>
              <th class="text-left" v-text="t('references.table.referenceName')"/>
              <th class="text-left" v-text="t('references.table.columnsNumber')"/>
              <th class="text-left" v-text="t('references.table.keyColumns')"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(_, key) in yamlStore.references">
              <td>
                <v-checkbox color="primary" :value="key" v-model="selectedKey" hide-details/>
              </td>
              <td>
                {{ key }}
              </td>
              <td>
                {{ Object.keys(yamlStore.references[key].columns).length }}
              </td>
              <td>
                {{ yamlStore.references[key].keyColumns.join(', ') }}
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
      {{ t('button.reference') }}
      <Reference v-model="addReferenceDialog" @close="addReferenceDialog = false" activator="parent" :reference-name="null"/>
    </v-btn>
  </v-container>
</template>

<style scoped>
</style>
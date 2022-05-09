<script>
  import {useI18n} from 'vue-i18n'

  import Reference from '/src/components/Reference.vue'
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
        editReferenceDialog: false,
        addReferenceDialog: false,
        deleteAlertDialog: false,
        selectedKey: null
      }
    },

    components: {
      Reference,
      DeleteAlert
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-alert type="info" border class="mb-5">
        <v-alert-title v-text="t('alert.info')"/>
        {{ t('alert.references') }}
      </v-alert>
      <v-card>
        <v-card-title>
          {{ t('references.title') }}
          <div class="d-flex gap-1 ml-auto">
            <v-btn prepend-icon="mdi-pencil" color="primary" class="mr-3" :disabled="selectedKey === null">
              {{ t('button.edit') }}
              <Reference v-model="editReferenceDialog" @close="editReferenceDialog = false" activator="parent" :reference-name="selectedKey"/>
            </v-btn>
            <v-btn prepend-icon="mdi-delete" color="error" :disabled="selectedKey === null">
              {{ t('button.delete') }}
              <DeleteAlert v-model="deleteAlertDialog" @close="deleteAlertDialog = false" activator="parent" :locale="['référentiel', 'reference']" :is-reference="true" :selectedKey="selectedKey"/>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-content>
          <v-table>
            <thead>
            <tr>
              <th/>
              <th class="text-left" v-text="t('references.referenceName')"/>
              <th class="text-left" v-text="t('references.columnsNumber')"/>
              <th class="text-left" v-text="t('references.keyColumns')"/>
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
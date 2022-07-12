<script>
  import {useI18n} from 'vue-i18n'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    data() {
      return {
        dialog: false
      }
    },

    props: {
      selectedKey : {
        type: String,
        required: true
      },
      isReference: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<template>
  <v-dialog activator="parent" v-model="dialog">
    <v-card width="30rem">
      <v-card-title v-if="isReference" v-text="t('delete.title', ['référentiel', 'reference'])"/>
      <v-card-title v-else v-text="t('delete.title', ['type de données', 'data type'])"/>
      <v-card-actions class="d-flex justify-center">
        <v-btn prepend-icon="mdi-close" color="primary" @click="dialog = false">
          {{ t('button.cancel') }}
        </v-btn>
        <v-btn prepend-icon="mdi-delete" color="error" @click="isReference ? delete yamlStore.references[selectedKey] : delete yamlStore.dataTypes[selectedKey]; dialog = false">
          {{ t('button.delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
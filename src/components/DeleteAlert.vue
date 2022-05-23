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
      locale: {
        type: Array,
        required: true
      },
      isReference: {
        type: Boolean,
        required: true
      },
      selectedKey : {
        type: String,
        required: true
      }
    }
  }
</script>

<template>
  <v-dialog activator="parent" v-model="dialog">
    <v-card width="30rem">
      <v-card-title v-text="t('delete.title', locale)"/>
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
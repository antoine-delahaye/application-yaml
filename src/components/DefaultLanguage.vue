<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

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
    }
  }
</script>

<template>
  <v-dialog activator="parent" v-model="dialog">
    <v-card width="30rem">
      <v-card-title v-text="t('defaultLanguage.title')"/>
      <v-card-content>
        <v-radio-group v-model="yamlStore.application.defaultLanguage" hide-details>
          <v-radio :label="t('fr')" value="fr" color="primary"/>
          <v-radio :label="t('en')" value="en" color="primary"/>
        </v-radio-group>
      </v-card-content>
      <v-card-actions class="d-flex justify-center">
        <v-btn prepend-icon="mdi-close" color="error" @click="dialog = false">
          {{ t('button.cancel') }}
        </v-btn>
        <v-btn prepend-icon="mdi-check" color="primary" @click="yamlStore.resetYaml" to="/application">
          {{ t('button.validate') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
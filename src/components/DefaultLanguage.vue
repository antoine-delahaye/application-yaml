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
        dialog: false,
        language: 'fr'
      }
    },

    props: {
      isNewFile: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<template>
  <v-dialog activator="parent" v-model="dialog">
    <v-card width="30rem">
      <v-card-title v-text="t('defaultLanguage.title')"/>
      <v-card-content>
        <v-radio-group v-model="language" hide-details>
          <v-radio :label="t('fr')" value="fr" color="primary"/>
          <v-radio :label="t('en')" value="en" color="primary"/>
        </v-radio-group>
      </v-card-content>
      <v-card-actions v-if="isNewFile" class="d-flex justify-center">
        <v-btn prepend-icon="mdi-close" color="error" @click="dialog = false">
          {{ t('button.cancel') }}
        </v-btn>
        <v-btn id="validate" prepend-icon="mdi-check" color="primary" @click.prevent="yamlStore.resetYaml(); yamlStore.setLanguage(language)" to="application">
          {{ t('button.validate') }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else class="d-flex justify-center">
        <v-btn prepend-icon="mdi-close" color="error" @click.prevent="$emit('closeDialog')">
          {{ t('button.cancel') }}
        </v-btn>
        <v-btn id="validate" prepend-icon="mdi-check" color="primary" @click.prevent="yamlStore.setLanguage(language); $emit('languageSet')" to="application">
          {{ t('button.validate') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
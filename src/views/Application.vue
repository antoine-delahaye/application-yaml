<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const {application} = storeToRefs(useYamlStore())
      return {t, application}
    },

    data() {
      return {
        inputRules: [
          (v) => !!v || this.t('application.errors.required'),
          (v) => (v && v.length <= 26) || this.t('application.errors.length')
        ]
      }
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-alert type="info" border>
        <v-alert-title v-text="t('alert.info')"/>
        {{ t('alert.application') }}
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-card max-width="50rem" class="mx-auto">
        <v-card-title>{{ t('application.title') }}</v-card-title>
        <v-card-content>
          <v-form>
            <div class="d-flex gap-3">
              <v-text-field :label="t('application.label', ['français', 'French'])"
                            :placeholder="t('application.frPlaceholder')"
                            variant="outlined" color="primary" v-model="application.internationalizationName.fr" :hint="t('hint.required')"
                            persistent-hint :rules="inputRules"/>
              <v-text-field :label="t('application.label', ['anglais', 'English'])"
                            :placeholder="t('application.enPlaceholder')"
                            variant="outlined" color="primary" :hint="t('hint.optional')" v-model="application.internationalizationName.en"
                            persistent-hint/>
            </div>
            <v-switch v-model="application.defaultLanguage" color="primary" hide-details true-value="en" false-value="fr" :label="t('application.checkbox')"/>
          </v-form>
        </v-card-content>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
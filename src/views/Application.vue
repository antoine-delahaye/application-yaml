<script>
  import {reactive} from 'vue'

  const lang = {
    'fr': false,
    'en': true
  }

  export default {
    data() {
      return {
        t: this.i18n.t,
        application: reactive({}),
        nameFr: this.yamlStore.application.internationalizationName.fr,
        nameEn: this.yamlStore.application.internationalizationName.en,
        enByDefault: lang[this.yamlStore.application.defaultLanguage],
        inputRules: [
          (v) => !!v || this.t('application.fr.errors.required'),
          (v) => (v && v.length <= 26) || this.t('application.fr.errors.length')
        ]
      }
    },

    /*mounted() {
      this.nameFr = this.yamlStore.application.internationalizationName.fr
      this.nameEn = this.yamlStore.application.internationalizationName.en
      this.enByDefault = lang[this.yamlStore.application.defaultLanguage]
    },*/

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

    methods: {
      save() {
        if (this.$refs.application.validate()) {
          this.application['defaultLanguage'] = this.enByDefault ? 'en' : 'fr'
          this.application['internationalizationName'] = {
            'fr': this.nameFr,
          }
          if (this.nameEn !== null) {
            this.application['internationalizationName']['en'] = this.nameEn
          }
          this.yamlStore.setApplication(this.application)
        }
      }
    }
  }
</script>

<template>
  <v-main class="d-flex align-center">
    <v-container fluid>
      <v-card max-width="50rem" class="mx-auto">
        <v-card-title>{{ t('application.title') }}</v-card-title>
        <v-card-content>
          <v-form ref="application">
            <div class="d-flex gap-3">
              <v-text-field :label="t('application.fr.label')" :placeholder="t('application.fr.placeholder')"
                            variant="outlined" color="primary" v-model="nameFr" :hint="t('application.fr.hint')"
                            persistent-hint :rules="inputRules"/>
              <v-text-field :label="t('application.en.label')" :placeholder="t('application.en.placeholder')"
                            variant="outlined" color="primary" :hint="t('application.en.hint')" v-model="nameEn"
                            persistent-hint/>
            </div>
            <v-checkbox :label="t('application.checkbox')" color="primary" v-model="enByDefault" hide-details/>
          </v-form>
        </v-card-content>
        <v-card-actions class="d-flex justify-center">
          <v-btn prepend-icon="mdi-check" color="primary" @click="save">
            {{ t('button.validate') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
<script>
  import {useI18n} from 'vue-i18n'
  import {useYamlStore} from "../store/yaml";

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    data() {
      return {
        inputRules: [
          (v) => !!v || this.t('rule.required'),
          (v) => (v && v.length <= 26) || this.t('rule.length', {length: 27}),
        ],
        labelParams: {
          fr: ['en français', 'in French'],
          en: ['en anglais', 'in English']
        }
      }
    },

    props: {
      model: {
        type: Object,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: true
      }
    }
  }
</script>

<template>
  <div v-if="yamlStore.getLanguage === 'fr'" class="d-flex gap-3">
    <v-text-field :id="label" v-model="model.fr" :rules="inputRules" variant="outlined" color="primary" persistent-hint
                  :label="t(label, labelParams.fr)" :placeholder="t(placeholder + '.fr')" :hint="t('hint.required')" required/>
    <v-text-field v-model="model.en" variant="outlined" color="primary" persistent-hint
                  :label="t(label, labelParams.en)" :placeholder="t(placeholder + '.en')" :hint="t('hint.optional')"/>
  </div>
  <div v-else class="d-flex gap-3">
    <v-text-field :id="label" v-model="model.en" :rules="inputRules" variant="outlined" color="primary" persistent-hint
                  :label="t(label, labelParams.en)" :placeholder="t(placeholder + '.en')" :hint="t('hint.required')" required/>
    <v-text-field v-model="model.fr" variant="outlined" color="primary" persistent-hint
                  :label="t(label, labelParams.fr)" :placeholder="t(placeholder + '.fr')" :hint="t('hint.optional')"/>
  </div>
</template>

<style scoped>
</style>
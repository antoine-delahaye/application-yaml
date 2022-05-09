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
        dataTypeNameFr: null,
        dataTypeNameEn: null,
        update: false
      }
    },

    updated() {
      if (this.dataTypeName !== null) {
        this.update = true
        this.dataTypeNameFr = this.yamlStore.dataTypes[this.dataTypeName].internationalizationName.fr
        this.dataTypeNameEn = this.yamlStore.dataTypes[this.dataTypeName].internationalizationName.en
      }
    },

    props: {
      dataTypeName: {
        type: String,
        required: false
      }
    },

    methods: {
      addDataType() {
        if (this.dataTypeNameFr !== null) {
          let index = this.dataTypeNameFr.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          this.yamlStore.dataTypes[index] = {
            internationalizationName: {
              fr: this.dataTypeNameFr,
              en: this.dataTypeNameEn
            }
          }
          this.dataTypeNameFr = null
          this.dataTypeNameEn = null
        }
      }
    }
  }
</script>

<template>
  <v-dialog>
    <v-card width="80rem">
      <v-card-content>
        <v-form>
          <div class="d-flex gap-3">
            <v-text-field :label="t('dataTypes.form.label', ['français', 'French'])" :placeholder="t('dataTypes.form.frPlaceholder')"
                          variant="outlined" color="primary" :hint="t('hint.required')" persistent-hint v-model="dataTypeNameFr"/>
            <v-text-field :label="t('dataTypes.form.label', ['anglais', 'English'])" :placeholder="t('dataTypes.form.enPlaceholder')"
                          variant="outlined" color="primary" :hint="t('hint.optional')" persistent-hint v-model="dataTypeNameEn"/>
          </div>
          <div class="d-flex justify-center gap-3 mt-5">
            <v-btn prepend-icon="mdi-close" color="error" @click="$emit('close')">
              {{ t('button.close') }}
            </v-btn>
            <v-btn v-if="update" prepend-icon="mdi-check" color="primary" @click="addDataType">
              {{ t('button.validate') }}
            </v-btn>
            <v-btn v-else prepend-icon="mdi-plus" color="primary" @click="addDataType">
              {{ t('button.add') }}
            </v-btn>
          </div>
        </v-form>
      </v-card-content>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
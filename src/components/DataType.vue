<script>
  export default {
    data() {
      return {
        t: this.i18n.t,
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
      i18n: {
        type: Object,
        required: true
      },
      yamlStore: {
        type: Object,
        required: true
      },
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
            <v-text-field :label="t('dataTypes.form.fr.label')" :placeholder="t('dataTypes.form.fr.placeholder')"
                          variant="outlined" color="primary" :hint="t('application.fr.hint')" persistent-hint v-model="dataTypeNameFr"/>
            <v-text-field :label="t('dataTypes.form.en.label')" :placeholder="t('dataTypes.form.en.placeholder')"
                          variant="outlined" color="primary" :hint="t('application.en.hint')" persistent-hint
                          v-model="dataTypeNameEn"/>
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
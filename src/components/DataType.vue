<script>
  import {useI18n} from 'vue-i18n'
  import {reactive} from 'vue'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'
  import getIndexName from '/src/utils'

  import Internationalization from '/src/components/Internationalization.vue'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      const {dataTypes} = storeToRefs(yamlStore)
      return {t, yamlStore, dataTypes}
    },

    data() {
      return {
        dataType: reactive({
          internationalizationName: {
            fr: null,
            en: null
          }
        }),
        rules: {
          required: v => !!v || this.t('rule.required')
        },
        dialog: false,
        dataTypeIsValid: true,
        tab: '0'
      }
    },

    updated() {
      if (this.dataTypeName !== null) {
        this.dataType = this.dataTypes[this.dataTypeName]
        if (this.dataType.internationalizationName === undefined) {
          if (this.yamlStore.getLanguage) {
            this.dataType['internationalizationName'] = {
              fr: this.dataTypeName,
              en: null
            }
          } else {
            this.dataType['internationalizationName'] = {
              fr: null,
              en: this.dataTypeName
            }
          }
        }
      }
    },

    props: {
      dataTypeName: {
        type: String,
        required: false
      }
    },

    components: {
      Internationalization
    },

    methods: {
      addDataType() {
        if (this.$refs.dataTypeName.validate()) {
          this.dataTypes[getIndexName(this.dataType.internationalizationName[this.yamlStore.getLanguage])] = this.dataType
          this.dataType = reactive({
            internationalizationName: {
              fr: null,
              en: null
            }
          })
          this.$refs.dataTypeName.resetValidation()
          this.dataTypeIsValid = false
        }
      }
    },

    watch: {
      dialog(value) {
        if (!value && this.dataTypeName && !this.dataTypes[this.dataType.internationalizationName[this.yamlStore.getLanguage]]) {
          const save = this.dataTypes[this.dataTypeName]
          delete this.dataTypes[this.dataTypeName]
          this.dataTypes[getIndexName(save.internationalizationName[this.yamlStore.getLanguage])] = save
        }
      }
    }
  }
</script>

<template>
  <v-dialog activator="parent" v-model="dialog">
    <v-card width="120vh">
      <v-card-title v-text="t('dataType.title')"/>
      <v-card-subtitle class="d-flex justify-center">
        <v-tabs v-model="tab">
          <v-tab color="primary" value="0">
            {{ t('dataType.name') }}
          </v-tab>
        </v-tabs>
      </v-card-subtitle>
      <v-window v-model="tab">
        <v-window-item value="0">
          <v-card-content>
            <v-form ref="dataTypeName" v-model="dataTypeIsValid" lazy-validation>
              <Internationalization :model="dataType.internationalizationName" label="dataType.name"
                                    placeholder="dataType.placeholder"/>
            </v-form>
          </v-card-content>
        </v-window-item>
      </v-window>
      <v-card-actions class="d-flex justify-center">
        <v-btn id="close" prepend-icon="mdi-close" color="error" @click="dialog = false">
          {{ t('button.close') }}
        </v-btn>
        <v-btn id="addDataType" v-if="!dataTypeName" prepend-icon="mdi-plus" color="primary"
               @click="addDataType" :disabled="!dataTypeIsValid">
          {{ t('button.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
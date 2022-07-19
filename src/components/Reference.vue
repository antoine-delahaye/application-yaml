<script>
  import {useI18n} from 'vue-i18n'
  import {reactive} from 'vue'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'
  import getIndexName from '/src/utils'

  import Internationalization from '/src/components/Internationalization.vue'
  import Constraint from '/src/components/Constraint.vue'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      const {references} = storeToRefs(yamlStore)
      return {t, yamlStore, references}
    },

    data() {
      return {
        reference: reactive({
          validations: {},
          internationalizationName: {
            fr: null,
            en: null
          },
          internationalizedColumns: {},
          keyColumns: [],
          columns: {}
        }),
        columnName: {
          fr: null,
          en: null
        },
        validation: reactive({
          internationalizationName: {
            fr: null,
            en: null
          },
          checker: {
            name: null,
            params: {}
          },
          columns: []
        }),
        rules: {
          required: v => !!v || this.t('rule.required'),
          columnAlreadyExist: this.t('rule.columnAlreadyExist')
        },
        dialog: false,
        columnAlert: false,
        validationAlert: false,
        tab: '0',
        referenceIsValid: true,
        columnIsValid: true,
        constraintIsValid: true
      }
    },

    updated() {
      if (this.referenceName) {
        this.reference = this.references[this.referenceName]
        if (!this.reference.internationalizationName) {
          if (this.yamlStore.getLanguage === 'fr') {
            this.reference['internationalizationName'] = {
              fr: this.referenceName,
              en: null
            }
          } else {
            this.reference['internationalizationName'] = {
              fr: null,
              en: this.referenceName
            }
          }
        }
      }
      if (this.columns) {
        for (const i in this.columns) {
          const column = this.columns[i]
          const index = getIndexName(column)
          this.reference.internationalizedColumns[index] = column
          this.reference.columns[index] = null
        }
      }
    },

    props: {
      referenceName: {
        type: String,
        default: null,
        required: false
      },
      columns: {
        type: Array,
        default: null,
        required: false
      }
    },

    components: {
      Internationalization,
      Constraint
    },

    methods: {
      addColumn() {
        if (this.$refs.addColumn.validate()) {
          const index = getIndexName(this.columnName[this.yamlStore.getLanguage])
          this.reference.internationalizedColumns[index] = this.columnName
          this.reference.columns[index] = null
          this.columnName = {
            fr: null,
            en: null
          }
          this.$refs.addColumn.resetValidation()
          this.columnIsValid = true
        }
      },
      deleteColumn(index) {
        let haveConstraint = false
        for (const [_, value] of Object.entries(this.reference.validations)) {
          if (value.columns.includes(index)) {
            haveConstraint = true
            this.columnAlert = true
            break
          }
        }
        if (!haveConstraint) {
          this.columnAlert = false
          delete this.reference.columns[index]
          delete this.reference.internationalizedColumns[index]
        }
      },
      addConstraint() {
        if (this.$refs.addConstraint.validate()) {
          this.reference.validations[getIndexName(this.validation.internationalizationName.fr)] = this.validation
          this.validation = reactive({
            internationalizationName: {
              fr: null,
              en: null
            },
            checker: {
              name: null,
              params: {}
            },
            columns: []
          })
          this.$refs.addConstraint.resetValidation()
          this.constraintIsValid = true
        }
      },
      addReference() {
        if (this.$refs.referenceName.validate()) {
          if (Object.keys(this.reference.columns).length) {
            this.references[getIndexName(this.reference.internationalizationName[this.yamlStore.getLanguage])] = this.reference
            this.reference = reactive({
              validation: {},
              internationalizationName: {
                fr: null,
                en: null
              },
              internationalizedColumns: {},
              keyColumns: [],
              columns: {}
            })
            this.$refs.referenceName.resetValidation()
            this.referenceIsValid = false
          } else {
            this.tab = '1'
            this.validationAlert = true
          }
        }
      }
    },

    watch: {
      dialog(value) {
        if (!value && this.referenceName && !this.references[this.reference.internationalizationName[this.yamlStore.getLanguage]]) {
          const save = this.references[this.referenceName]
          delete this.references[this.referenceName]
          this.references[getIndexName(save.internationalizationName[this.yamlStore.getLanguage])] = save
        }
      }
    }
  }
</script>

<template>
  <v-dialog activator="parent" v-model="dialog">
    <v-card width="120vh">
      <v-card-title v-text="t('reference.title')"/>
      <v-card-subtitle class="d-flex justify-center">
        <v-tabs v-model="tab">
          <v-tab id="referenceName" color="primary" value="0">
            {{ t('reference.name') }}
          </v-tab>
          <v-tab id="addColumns" color="primary" value="1" :disabled="!reference.internationalizationName[yamlStore.getLanguage]">
            {{ t('reference.column.subtitle') }}
          </v-tab>
          <v-tab id="addConstraints" color="primary" value="2"
                 :disabled="!reference.internationalizationName[yamlStore.getLanguage] || !Object.keys(this.reference.columns).length">
            {{ t('reference.constraint.subtitle') }}
          </v-tab>
        </v-tabs>
      </v-card-subtitle>
      <v-window v-model="tab">
        <v-window-item value="0">
          <v-card-content>
            <v-form ref="referenceName" v-model="referenceIsValid" lazy-validation>
              <Internationalization :model="reference.internationalizationName" label="reference.name"
                                    placeholder="reference.placeholder"/>
            </v-form>
          </v-card-content>
        </v-window-item>
        <v-window-item value="1">
          <v-card-content>
            <v-alert v-model="columnAlert" type="warning" border closable class="mb-5">
              <v-alert-title v-text="t('alert.action')"/>
              {{ t('alert.column') }}
            </v-alert>
            <v-alert v-model="validationAlert" type="warning" border closable class="mb-5">
              <v-alert-title v-text="t('alert.action')"/>
              {{ t('alert.validation') }}
            </v-alert>
            <v-form ref="addColumn" v-model="columnIsValid" lazy-validation>
              <Internationalization :model="columnName" label="reference.column.name"
                                    placeholder="reference.placeholder"/>
              <div class="text-center">
                <v-btn id="addColumn" prepend-icon="mdi-plus-circle" color="primary" @click="addColumn"
                       :disabled="!columnIsValid">
                  {{ t('button.add', ['une colonne', 'a column']) }}
                </v-btn>
              </div>
            </v-form>
            <v-table height="30vh">
              <thead>
              <tr>
                <th v-text="t('reference.column.name')"/>
                <th v-text="t('reference.keyColumn')"/>
                <th v-text="t('references.deleteRow')"/>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(_, key) in reference.columns">
                <td v-text="key"/>
                <td>
                  <v-checkbox id="primaryKey" class='isPrimaryKey' color="primary" :value="key"
                              v-model="reference.keyColumns"
                              hide-details/>
                </td>
                <td>
                  <div class="d-flex align-center gap-3">
                    <v-btn size="small" color="error" @click="deleteColumn(key)">
                      <v-icon icon="mdi-delete"/>
                    </v-btn>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-content>
        </v-window-item>
        <v-window-item value="2">
          <v-card-content>
            <v-form ref="addConstraint" v-model="constraintIsValid" lazy-validation>
              <Internationalization :model="validation.internationalizationName" label="reference.constraint.name"
                                    placeholder="reference.placeholder"/>
              <Constraint :validation="validation" :reference="reference"/>
              <div class="text-center">
                <v-btn id="addConstraint" prepend-icon="mdi-plus-circle" color="primary" @click="addConstraint"
                       :disabled="!constraintIsValid">
                  {{ t('button.add', ['une contrainte', 'a constraint']) }}
                </v-btn>
              </div>
            </v-form>
            <v-table height="30vh">
              <thead>
              <tr>
                <th v-text="t('reference.constraint.name')"/>
                <th v-text="t('reference.constraint.type')"/>
                <th v-text="t('reference.constraint.value')"/>
                <th v-text="t('references.deleteRow')"/>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, key) in reference.validations">
                <td v-text="key"/>
                <td v-text="value.checker.name"/>
                <td v-if="value.checker.name === 'Reference'" v-text="value.columns.join(', ')"/>
                <td v-if="value.checker.name === 'Date'" v-text="value.columns[0] + ' - ' + value.columns[1]"/>
                <td v-if="value.checker.name === 'Integer'"/>
                <td v-if="value.checker.name === 'Float'"/>
                <td v-if="value.checker.name === 'GroovyExpression'" v-text="value.checker.params.groovy.expression"/>
                <td v-if="value.checker.name === 'RegularExpression'" v-text="value.checker.params.pattern"/>
                <td>
                  <div class="d-flex align-center gap-3">
                    <v-btn size="small" color="error" @click="delete reference.validations[key]">
                      <v-icon icon="mdi-delete"/>
                    </v-btn>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-content>
        </v-window-item>
      </v-window>
      <v-card-actions class="d-flex justify-center">
        <v-btn id="close" prepend-icon="mdi-close" color="error" @click.prevent="dialog = false; $emit('closeDialog')">
          {{ t('button.close') }}
        </v-btn>
        <v-btn id="addReference" v-if="!referenceName" prepend-icon="mdi-plus" color="primary"
               @click="addReference" :disabled="!referenceIsValid">
          {{ t('button.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
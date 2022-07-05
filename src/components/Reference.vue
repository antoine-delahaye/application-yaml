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
        alert: false
      }
    },

    updated() {
      if (this.referenceName !== null) {
        this.reference = this.references[this.referenceName]
        if (this.reference.internationalizationName === undefined) {
          if (this.yamlStore.getLanguage) {
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
    },

    props: {
      referenceName: {
        type: String,
        required: false
      }
    },

    components: {
      Internationalization
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
        }
      },
      addReference() {
        if (this.$refs.referenceName.validate()) {
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
        }
      },
      addConstraint() {
        if (this.$refs.addConstraint.validate() && this.$refs.addColumn.validate()) {
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
        }
      },
      deleteColumn(index) {
        let haveConstraint = false
        for (const [_, value] of Object.entries(this.reference.validations)) {
          if (value.columns.includes(index)) {
            haveConstraint = true
            this.alert = true
            break
          }
        }
        if (!haveConstraint) {
          this.alert = false
          delete this.reference.columns[index]
          delete this.reference.internationalizedColumns[index]
        }
      }
    },

    watch: {
      dialog(value) {
        if (value === false && this.referenceName !== null && this.references[this.reference.internationalizationName[this.yamlStore.getLanguage]] === undefined) {
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
    <v-card width="150vh">
      <v-card-title v-text="t('reference.title')"/>
      <v-card-subtitle v-text="t('reference.name')"/>
      <v-card-content>
        <v-form ref="referenceName">
          <Internationalization :model="reference.internationalizationName" label="reference.name"
                                placeholder="reference.placeholder"/>
        </v-form>
      </v-card-content>
      <v-card-subtitle v-text="t('reference.column.subtitle')"/>
      <v-card-content>
        <v-form ref="addColumn">
          <Internationalization :model="columnName" label="reference.column.name" placeholder="reference.placeholder"/>
          <div class="text-center">
            <v-btn id="addColumn" prepend-icon="mdi-plus-circle" color="primary" @click="addColumn">
              {{ t('button.add', ['une colonne', 'a column']) }}
            </v-btn>
          </div>
        </v-form>
        <v-alert v-model="alert" type="warning" border closable>
          <v-alert-title v-text="t('alert.action')"/>
          {{ t('alert.column') }}
        </v-alert>
        <v-table>
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
      <v-card-subtitle v-text="t('reference.constraint.subtitle')"/>
      <v-card-content>
        <v-form ref="addConstraint">
          <Internationalization :model="validation.internationalizationName" label="reference.constraint.name"
                                placeholder="reference.placeholder"/>
          <div class="d-flex gap-3">
            <v-select id="constraintType" v-model="validation.checker.name"
                      :items="['Reference', 'Integer', 'Float', 'Date', 'GroovyExpression', 'RegularExpression']"
                      :label="t('reference.constraint.type')" variant="outlined" :rules="[rules.required]"
                      color="primary"/>
            <v-select id="selectedColumn" v-if="validation.checker.name === 'Reference'" v-model="validation.columns"
                      :items="Object.keys(reference.columns)" :label="t('reference.constraint.references')" multiple
                      variant="outlined" chips :rules="[rules.required]" color="primary"/>
            <template v-else-if="validation.checker.name === 'Date'">
              <v-select v-model="validation.checker.params['pattern']"
                        :items="['dd/MM/YYYY', 'YYYY/MM/dd', 'MM/dd/YYYY']" :label="t('reference.constraint.date')"
                        variant="outlined" :rules="[rules.required]" color="primary"/>
              <v-text-field v-model="validation.columns[0]" :label="t('reference.constraint.startDate')"
                            variant="outlined" :rules="[rules.required]" color="primary"/>
              <v-text-field v-model="validation.columns[1]" :label="t('reference.constraint.endDate')"
                            variant="outlined" :rules="[rules.required]" color="primary"/>
            </template>
            <v-text-field v-else-if="validation.checker.name === 'GroovyExpression'"
                          v-model="validation.checker.params['groovy']['expression']"
                          :label="t('reference.constraint.groovy')" variant="outlined" :rules="[rules.required]"
                          color="primary"/>
            <v-text-field v-else-if="validation.checker.name === 'RegularExpression'"
                          v-model="validation.checker.params['pattern']"
                          :label="t('reference.constraint.regex')" variant="outlined" :rules="[rules.required]"
                          color="primary"/>
          </div>
          <div class="text-center">
            <v-btn id="addConstraint" prepend-icon="mdi-plus-circle" color="primary" @click="addConstraint">
              {{ t('button.add', ['une contrainte', 'a constraint']) }}
            </v-btn>
          </div>
        </v-form>
        <v-table>
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
      <v-card-actions class="d-flex justify-center">
        <v-btn id="close" prepend-icon="mdi-close" color="error" @click="dialog = false">
          {{ t('button.close') }}
        </v-btn>
        <v-btn id="addReference" v-if="referenceName === null" prepend-icon="mdi-plus" color="primary"
               @click="addReference">
          {{ t('button.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
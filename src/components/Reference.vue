<script>
  import {useI18n} from 'vue-i18n'
  import {reactive} from 'vue'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'
  import getIndexName from '/src/utils'

  export default {
    setup() {
      const {t} = useI18n()
      const {references} = storeToRefs(useYamlStore())
      return {t, references}
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
        frColumnName: null,
        enColumnName: null,
        validation: reactive({
          internationalizationName: {
            fr: null,
            en: null
          },
          checker: {
            name: null,
            params: {
              refType: null,
              required: null,
              groovy: {
                expression: null
              },
              pattern: null
            }
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
          this.reference['internationalizationName'] = {
            fr: this.referenceName,
            en: null
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

    methods: {
      addColumn() {
        if (this.$refs.addColumn.validate()) {
          const index = getIndexName(this.frColumnName)
          this.reference.internationalizedColumns[index] = {
            fr: this.frColumnName,
            en: this.enColumnName
          }
          this.reference.columns[index] = null
          this.frColumnName = null
          this.enColumnName = null
        }
      },
      addReference() {
        if (this.$refs.referenceName.validate()) {
          this.references[getIndexName(this.reference.internationalizationName.fr)] = this.reference
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
              params: {
                refType: null,
                required: null,
                groovy: {
                  expression: null
                },
                pattern: null
              }
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
        if (value === false && this.referenceName !== null && this.references[this.reference.internationalizationName.fr] === undefined) {
          const save = this.references[this.referenceName]
          delete this.references[this.referenceName]
          this.references[getIndexName(save.internationalizationName.fr)] = save
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
        <v-form ref="referenceName" class="d-flex gap-3">
          <v-text-field :label="t('reference.name', ['en français', 'in French'])"
                        :placeholder="t('reference.frPlaceholder')"
                        variant="outlined" color="primary" :hint="t('hint.required')" persistent-hint
                        v-model="reference.internationalizationName.fr" :rules="[rules.required]"/>
          <v-text-field :label="t('reference.name', ['en anglais', 'in English'])"
                        :placeholder="t('reference.enPlaceholder')"
                        variant="outlined" color="primary" :hint="t('hint.optional')" persistent-hint
                        v-model="reference.internationalizationName.en"/>
        </v-form>
      </v-card-content>
      <v-card-subtitle v-text="t('reference.column.subtitle')"/>
      <v-card-content>
        <v-form ref="addColumn" class="d-flex gap-3">
          <v-text-field :label="t('reference.column.name', ['en français', 'in French'])"
                        :placeholder="t('reference.frPlaceholder')"
                        variant="outlined" color="primary" :hint="t('hint.required')" persistent-hint
                        v-model="frColumnName" :rules="[rules.required]"/>
          <v-text-field :label="t('reference.column.name', ['en anglais', 'in English'])"
                        :placeholder="t('reference.enPlaceholder')"
                        variant="outlined" color="primary" :hint="t('hint.optional')" persistent-hint
                        v-model="enColumnName"/>
          <v-btn color="primary" @click="addColumn" class="mt-2">
            <v-icon icon="mdi-plus-circle"/>
          </v-btn>
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
              <v-checkbox class='isPrimaryKey' color="primary" :value="key" v-model="reference.keyColumns"
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
          <div class="d-flex gap-3">
            <v-text-field :label="t('reference.constraint.name', ['en français', 'in French'])"
                          :placeholder="t('reference.frPlaceholder')"
                          variant="outlined" color="primary" :hint="t('hint.required')" persistent-hint
                          v-model="validation.internationalizationName.fr" :rules="[rules.required]"/>
            <v-text-field :label="t('reference.constraint.name', ['en anglais', 'in English'])"
                          :placeholder="t('reference.enPlaceholder')"
                          variant="outlined" color="primary" :hint="t('hint.optional')" persistent-hint
                          v-model="validation.internationalizationName.en"/>
          </div>
          <div class="d-flex gap-3">
            <v-select v-model="validation.checker.name"
                      :items="['Reference', 'Integer', 'Float', 'Date', 'GroovyExpression', 'RegularExpression']"
                      :label="t('reference.constraint.type')" variant="outlined" :rules="[rules.required]" color="primary"/>
            <v-select v-if="validation.checker.name === 'Reference'" v-model="validation.columns"
                      :items="Object.keys(reference.columns)" :label="t('reference.constraint.references')" multiple
                      variant="outlined" chips :rules="[rules.required]" color="primary"/>
            <v-text-field v-else-if="validation.checker.name === 'Date'" v-model="validation.checker.params.pattern"
                          :label="t('reference.constraint.date')" variant="outlined" :rules="[rules.required]" color="primary"/>
            <v-text-field v-else-if="validation.checker.name === 'GroovyExpression'" v-model="validation.checker.params.groovy.expression"
                      :label="t('reference.constraint.groovy')" variant="outlined" :rules="[rules.required]" color="primary"/>
            <v-text-field v-else-if="validation.checker.name === 'RegularExpression'" v-model="validation.checker.params.pattern"
                      :label="t('reference.constraint.regex')" variant="outlined" :rules="[rules.required]" color="primary"/>
            <v-btn color="primary" @click="addConstraint" class="mt-2">
              <v-icon icon="mdi-plus-circle"/>
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
            <td v-if="value.checker.name === 'Date'" v-text="value.checker.params.pattern"/>
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
        <v-btn prepend-icon="mdi-close" color="error" @click="dialog = false">
          {{ t('button.close') }}
        </v-btn>
        <v-btn v-if="referenceName === null" prepend-icon="mdi-plus" color="primary" @click="addReference">
          {{ t('button.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
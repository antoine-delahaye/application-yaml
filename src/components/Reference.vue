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
          internationalizationName: {
            fr: null,
            en: null
          },
          keyColumns: [],
          columns: {}
        }),
        columnName: null,
        rules: {
          referenceNameFr: v => !!v || this.t('rule.required')
        },
        dialog: false
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
        if (this.$refs.reference.validate() && this.columnName !== null) {
          this.reference.columns[this.columnName] = null
          this.columnName = null
        }
      },
      addReference() {
        if (this.$refs.reference.validate() && this.reference.internationalizationName.fr !== null) {
          this.references[getIndexName(this.reference.internationalizationName.fr)] = this.reference
          this.reference = reactive({
            internationalizationName: {
              fr: null,
              en: null
            },
            keyColumns: [],
            columns: {}
          })
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
    <v-card width="80rem">
      <v-card-content>
        <v-form ref="reference">
          <div class="d-flex gap-3">
            <v-text-field :label="t('reference.label', ['français', 'French'])"
                          :placeholder="t('reference.frPlaceholder')"
                          variant="outlined" color="primary" :hint="t('hint.required')" persistent-hint
                          v-model="reference.internationalizationName.fr" :rules="[rules.referenceNameFr]"/>
            <v-text-field :label="t('reference.label', ['anglais', 'English'])"
                          :placeholder="t('reference.enPlaceholder')"
                          variant="outlined" color="primary" :hint="t('hint.optional')" persistent-hint
                          v-model="reference.internationalizationName.en"/>
          </div>
          <div class="d-flex gap-3">
            <v-text-field :label="t('reference.columnName')" :placeholder="t('reference.placeholder')"
                          variant="outlined" color="primary" v-model="columnName"/>
            <v-btn color="primary" @click="addColumn" class="mt-2">
              <v-icon icon="mdi-plus-circle"/>
            </v-btn>
          </div>
          <v-table>
            <thead>
            <tr>
              <th v-text="t('reference.columnName')"/>
              <th v-text="t('reference.keyColumn')"/>
              <th v-text="t('references.deleteRow')"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(_, key) in reference.columns">
              <td>
                <v-text-field variant="contained" density="compact" single-line hide-details disabled>
                  {{ key }}
                </v-text-field>
              </td>
              <td>
                <v-checkbox color="primary" :value="key" v-model="reference.keyColumns" hide-details/>
              </td>
              <td>
                <div class="d-flex align-center gap-3">
                  <v-btn size="small" color="error" @click="delete reference.columns[key]">
                    <v-icon icon="mdi-delete"/>
                  </v-btn>
                </div>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-form>
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
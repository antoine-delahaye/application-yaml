<script>
  import {useI18n} from 'vue-i18n'
  import {reactive} from 'vue'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      return {t, yamlStore}
    },

    data() {
      return {
        referenceNameFr: null,
        referenceNameEn: null,
        keyColumns: [],
        columns: reactive({}),
        columnName: null,
        update: false,
        rules: {
          referenceNameFr: v => !!v || this.t('rule.required'),
          columns: v => Object.keys(this.columns).length > 0 || this.t('rule.required'),
        },
        dialog: false
      }
    },

    updated() {
      if (this.referenceName !== null) {
        this.update = true
        this.referenceNameFr = this.yamlStore.references[this.referenceName].internationalizationName.fr
        this.referenceNameEn = this.yamlStore.references[this.referenceName].internationalizationName.en
        this.keyColumns = this.yamlStore.references[this.referenceName].keyColumns
        this.columns = this.yamlStore.references[this.referenceName].columns
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
        if (this.columnName !== null) {
          this.columns[this.columnName] = null
          this.columnName = null
        }
      },
      addReference() {
        if (this.$refs.reference.validate() && this.referenceNameFr !== null && Object.keys(this.columns).length > 0) {
          let index = this.referenceNameFr.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
          this.yamlStore.references[index] = {
            internationalizationName: {
              fr: this.referenceNameFr,
              en: this.referenceNameEn
            }
          }
          this.yamlStore.references[index]['keyColumns'] = this.keyColumns
          this.yamlStore.references[index]['columns'] = this.columns
          this.keyColumns = []
          this.columns = reactive({})
          this.referenceNameFr = null
          this.referenceNameEn = null
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
                          v-model="referenceNameFr" :rules="[rules.referenceNameFr]"/>
            <v-text-field :label="t('reference.label', ['anglais', 'English'])"
                          :placeholder="t('reference.enPlaceholder')"
                          variant="outlined" color="primary" :hint="t('hint.optional')" persistent-hint
                          v-model="referenceNameEn"/>
          </div>
          <div class="d-flex gap-3">
            <v-text-field :label="t('reference.columnName')" :placeholder="t('reference.placeholder')"
                          variant="outlined" color="primary" v-model="columnName" :rules="[rules.columns]"/>
            <v-btn color="primary" @click="addColumn" class="mt-2">
              <v-icon icon="mdi-plus-circle"/>
            </v-btn>
          </div>
          <v-table>
            <thead>
            <tr>
              <th class="text-left" v-text="t('reference.columnName')"/>
              <th class="text-left" v-text="t('reference.keyColumn')"/>
              <th class="text-left" v-text="t('references.actions')"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(_, key) in columns">
              <td>
                <v-text-field variant="contained" density="compact" single-line disabled hide-details>
                  {{ key }}
                </v-text-field>
              </td>
              <td>
                <v-checkbox color="primary" :value="key" v-model="keyColumns" hide-details/>
              </td>
              <td>
                <div class="d-flex align-center gap-3">
                  <v-btn size="small" color="error" @click="delete columns[key]">
                    <v-icon icon="mdi-delete"/>
                  </v-btn>
                  <v-btn size="small" color="primary">
                    <v-icon icon="mdi-pencil"/>
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
        <v-btn v-if="update" prepend-icon="mdi-check" color="primary" @click="addReference">
          {{ t('button.validate') }}
        </v-btn>
        <v-btn v-else prepend-icon="mdi-plus" color="primary" @click="addReference">
          {{ t('button.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
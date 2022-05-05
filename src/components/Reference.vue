<script>
  import {reactive} from 'vue'

  export default {
    data() {
      return {
        t: this.i18n.t,
        referenceNameFr: null,
        referenceNameEn: null,
        keyColumns: [],
        columns: reactive({}),
        columnName: null,
        update: false
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
      i18n: {
        type: Object,
        required: true
      },
      yamlStore: {
        type: Object,
        required: true
      },
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
        if (this.referenceNameFr !== null && Object.keys(this.columns).length > 0) {
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
      },
      removeColumn(column) {
        delete this.columns[column]
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
            <v-text-field :label="t('references.form.fr.label')" :placeholder="t('references.form.fr.placeholder')"
                          variant="outlined" color="primary" :hint="t('application.fr.hint')" persistent-hint v-model="referenceNameFr"/>
            <v-text-field :label="t('references.form.en.label')" :placeholder="t('references.form.en.placeholder')"
                          variant="outlined" color="primary" :hint="t('application.en.hint')" persistent-hint
                          v-model="referenceNameEn"/>
          </div>
          <v-text-field :label="t('references.form.columnName')" :placeholder="t('references.form.placeholder')"
                        variant="outlined" color="primary" hide-details append-icon="mdi-plus-circle"
                        @click:append="addColumn" v-model="columnName" class="pr-2"/>
          <v-table>
            <thead>
            <tr>
              <th class="text-left" v-text="t('references.form.columnName')"/>
              <th class="text-left" v-text="t('references.form.keyColumn')"/>
              <th class="text-left" v-text="t('references.table.actions')"/>
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
                <v-btn icon="mdi-pencil" size="small" color="primary" class="mr-3"/>
                <v-btn icon="mdi-delete" size="small" color="error" @click="removeColumn(key)"/>
              </td>
            </tr>
            </tbody>
          </v-table>
          <div class="d-flex justify-center gap-3 mt-5">
            <v-btn prepend-icon="mdi-close" color="error" @click="$emit('close')">
              {{ t('button.close') }}
            </v-btn>
            <v-btn v-if="update" prepend-icon="mdi-check" color="primary" @click="addReference">
              {{ t('button.validate') }}
            </v-btn>
            <v-btn v-else prepend-icon="mdi-plus" color="primary" @click="addReference">
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
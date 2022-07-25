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
        dialog: false,
        inputRules: [
          (v) => typeof v === 'number' || this.t('rule.number'),
          (v) => v > 0 || this.t('rule.positive')
        ],
        rowNumber: 1
      }
    },

    props: {
      title: {
        type: Array,
        required: false
      }
    }
  }
</script>

<template>
  <v-dialog v-model="dialog">
    <v-card width="30rem">
      <v-card-title v-text="t('rowNumber.title', title)"/>
      <v-card-content>
        <v-text-field v-model="rowNumber" :label="t('rowNumber.label')" variant="outlined" :rules="inputRules" type="number" color="primary"/>
      </v-card-content>
      <v-card-actions class="d-flex justify-center">
        <v-btn prepend-icon="mdi-close" color="error" @click="dialog = false; $emit('cancelAction')">
          {{ t('button.cancel') }}
        </v-btn>
        <v-btn prepend-icon="mdi-check" color="primary" @click="$emit('rowSelected', rowNumber); dialog = false">
          {{ t('button.validate') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
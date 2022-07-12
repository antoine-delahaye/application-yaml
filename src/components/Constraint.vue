<script>
  import {useI18n} from 'vue-i18n'

  export default {
    setup() {
      const {t} = useI18n()
      return {t}
    },

    data() {
      return {
        inputRules: [
          (v) => !!v || this.t('rule.required'),
          (v) => (v && v.length <= 26) || this.t('rule.length', {length: 27}),
        ]
      }
    },

    props: {
      validation: {
        type: Object,
        required: true
      },
      reference: {
        type: Object,
        required: true
      }
    }
  }
</script>

<template>
  <div class="d-flex gap-3">
    <v-select id="constraintType" v-model="validation.checker.name"
              :items="['Reference', 'Integer', 'Float', 'Date', 'GroovyExpression', 'RegularExpression']"
              :label="t('reference.constraint.type')" variant="outlined"
              color="primary" required :rules="inputRules"/>
    <v-select id="selectedColumn" v-if="validation.checker.name === 'Reference'"
              v-model="validation.columns"
              :items="Object.keys(reference.columns)" :label="t('reference.constraint.references')" multiple
              variant="outlined" chips color="primary" required :rules="inputRules"/>
    <template v-else-if="validation.checker.name === 'Date'">
      <v-select v-model="validation.checker.params['pattern']"
                :items="['dd/MM/yy', 'dd/MM/yyyy', 'MM/yyyy', 'M/yyyy', 'hh:mm', 'hh:mm:ss', 'dd/MM/yy hh:mm:ss']"
                :label="t('reference.constraint.date')"
                variant="outlined" :rules="inputRules" color="primary"/>
      <v-text-field v-model="validation.columns[0]" :label="t('reference.constraint.startDate')"
                    variant="outlined" :rules="inputRules" color="primary"/>
      <v-text-field v-model="validation.columns[1]" :label="t('reference.constraint.endDate')"
                    variant="outlined" :rules="inputRules" color="primary"/>
    </template>
    <v-text-field v-else-if="validation.checker.name === 'GroovyExpression'"
                  v-model="validation.checker.params['groovy']['expression']"
                  :label="t('reference.constraint.groovy')" variant="outlined" :rules="inputRules"
                  color="primary"/>
    <v-text-field v-else-if="validation.checker.name === 'RegularExpression'"
                  v-model="validation.checker.params['pattern']"
                  :label="t('reference.constraint.regex')" variant="outlined" :rules="inputRules"
                  color="primary"/>
  </div>
</template>

<style scoped>
</style>
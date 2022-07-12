<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'

  import Reference from '/src/components/Reference.vue'

  export default {
    setup() {
      const {t} = useI18n()
      const yamlStore = useYamlStore()
      const {application, references} = storeToRefs(yamlStore)
      return {t, yamlStore, application, references}
    },

    components: {
      Reference
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-alert type="info" border>
        <v-alert-title v-text="t('alert.info')"/>
        {{ t('alert.visualization') }}
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-card>
        <v-card-title v-text="t('visualization.title')"/>
        <v-card-content>
          <v-list>
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item rounded v-bind="props" :title="t('nav.application')"></v-list-item>
              </template>
              <template v-if="application.internationalizationName[yamlStore.getLanguage]">
                <v-list-item to="application"
                             :title="t('application.label', [' : ', ': ']) + ' ' + application.internationalizationName[yamlStore.getLanguage]"/>
              </template>
              <template v-else-if="application.name">
                <v-list-item to="application" :title="t('application.label', [' : ', ': ']) + ' ' + application.name"/>
              </template>
              <v-list-item :title="t('application.language') + ' ' + t(yamlStore.getLanguage)"/>
              <v-list-item :title="t('application.version') + ' ' + application.version"/>
            </v-list-group>
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item rounded v-bind="props" :title="t('nav.references')"/>
              </template>
              <v-list-group v-for="(value, key) in references">
                <template v-slot:activator="{ props }">
                  <v-list-item rounded v-if="value.internationalizationName === undefined" v-bind="props" v-text="key"/>
                  <v-list-item rounded v-else v-bind="props"
                               v-text="value.internationalizationName[yamlStore.getLanguage]"/>
                </template>
                <v-list-item class="d-flex flex-column align-start" rounded @click.prevent="">
                  <p v-text="Object.keys(value.columns).length + ' ' + t('visualization.references.column', Object.keys(value.columns).length)"/>
                  <p v-if="value.validations !== undefined"
                     v-text="Object.keys(value.validations).length + ' ' + t('visualization.references.constraint', Object.keys(value.validations).length)"/>
                  <p v-else v-text="'0 ' + t('visualization.references.constraint', 0)"/>
                  <Reference :reference-name="key"/>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-card-content>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
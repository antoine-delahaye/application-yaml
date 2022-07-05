<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'
  import getIndexName from '/src/utils'

  import Internationalization from '/src/components/Internationalization.vue'

  export default {
    setup() {
      const {t} = useI18n()
      const {application} = storeToRefs(useYamlStore())
      return {t, application}
    },

    unmounted() {
      if (this.application.internationalizationName.fr !== null) {
        this.application.name = getIndexName(this.application.internationalizationName.fr)
      }
    },

    components: {
      Internationalization
    }
  }
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-alert type="info" border>
        <v-alert-title v-text="t('alert.info')"/>
        {{ t('alert.application') }}
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-card max-width="50rem" class="mx-auto">
        <v-card-title>{{ t('application.title') }}</v-card-title>
        <v-card-subtitle>
          <v-list density="compact">
            <v-list-item>
              <v-list-item-avatar start>
                <v-icon icon="mdi-git"/>
              </v-list-item-avatar>
              <v-list-item-title v-text="t('application.version') + ' ' + application.version"/>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar start>
                <v-icon icon="mdi-translate"/>
              </v-list-item-avatar>
              <v-list-item-title v-text="t('application.language') + ' ' + t(application.defaultLanguage)"/>
            </v-list-item>
          </v-list>
        </v-card-subtitle>
        <v-card-content>
          <v-form>
            <Internationalization :model="application.internationalizationName"
                                  label="application.label" placeholder="application.placeholder"/>
          </v-form>
        </v-card-content>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
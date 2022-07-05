<script>
  import {useI18n} from 'vue-i18n'
  import {storeToRefs} from 'pinia'

  import {useYamlStore} from '/src/store/yaml'

  export default {
    setup() {
      const {t} = useI18n()
      const {application, references} = storeToRefs(useYamlStore())
      return {t, application, references}
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
              <template v-if="application.internationalizationName === undefined">
                <v-list-item>
                  {{ t('application.label', [' : ', ': ']) }}
                  <router-link class="value-link" to="application">{{ application.name }}</router-link>
                </v-list-item>
              </template>
              <template v-else-if="application.defaultLanguage === 'fr'">
                <v-list-item>
                  {{ t('application.label', [' : ', ': ']) }}
                  <router-link class="value-link" to="application">{{
                      application.internationalizationName.fr
                    }}
                  </router-link>
                </v-list-item>
                <v-list-item>
                  {{ t('application.language') }}
                  <router-link class="value-link" to="application">{{ t('fr') }}</router-link>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item>
                  {{ t('application.label', [' : ', ': ']) }}
                  <router-link class="value-link" to="application">{{
                      application.internationalizationName.en
                    }}
                  </router-link>
                </v-list-item>
                <v-list-item>
                  {{ t('application.language') }}
                  <router-link class="value-link" to="application">{{ t('en') }}</router-link>
                </v-list-item>
              </template>
              <v-list-item :title="t('application.version') + ' ' + application.version"/>
            </v-list-group>
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item rounded v-bind="props" :title="t('nav.references')"/>
              </template>
              <v-list-group v-for="(value, key) in references">
                <template v-slot:activator="{ props }">
                  <v-list-item rounded v-if="value.internationalizationName === undefined" v-bind="props" v-text="key"/>
                  <v-list-item rounded v-else-if="application.defaultLanguage === 'fr'" v-bind="props"
                               v-text="value.internationalizationName.fr"/>
                  <v-list-item rounded v-else v-bind="props" v-text="value.internationalizationName.en"/>
                </template>
                <v-list-item class="d-flex flex-column align-start" rounded to="references">
                  <p v-text="Object.keys(value.columns).length + ' ' + t('visualization.references.column', Object.keys(value.columns).length)"/>
                  <p v-if="value.validations !== undefined"
                     v-text="Object.keys(value.validations).length + ' ' + t('visualization.references.constraint', Object.keys(value.validations).length)"/>
                  <p v-else v-text="'0 ' + t('visualization.references.constraint', 0)"/>
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
  .value-link {
    color: #00a3a6;
    text-decoration: none;
  }

  .value-link:hover {
    text-decoration: underline;
  }
</style>
import {defineStore} from 'pinia'

export const useYamlStore = defineStore({
    id: 'yaml',
    state: () => ({
        application: {
            defaultLanguage: 'fr',
            internationalizationName: {
                fr: null,
                en: null
            },
            name: null,
            version: 1
        },
        compositeReferences: {},
        references: {},
        dataTypes: {}
    }),
    getters: {
        getYaml() {
            return {
                version: 1,
                application: this.application,
                compositeReferences: this.compositeReferences,
                references: this.references,
                dataTypes: this.dataTypes

            }
        }
    },
    actions: {
        setYaml(yaml) {
            this.application = yaml.application
            this.compositeReferences = yaml.compositeReferences
            this.references = yaml.references
            this.dataTypes = yaml.dataTypes
        },

        resetYaml() {
            this.application = {
                defaultLanguage: 'fr',
                internationalizationName: {
                    fr: null,
                    en: null
                },
                name: null,
                version: 1
            }
            this.compositeReferences = {}
            this.references = {}
            this.dataTypes = {}
        },

        setApplication(application) {
            this.application = application
        },

        addReference(index, reference) {
            this.references[index] = reference
        }
    }
})
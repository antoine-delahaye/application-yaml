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
        references: {},
        dataTypes: {},
        compositeReferences: {}
    }),
    getters: {
        getYaml() {
            return {
                version: 1,
                application: this.application,
                references: this.references,
                dataTypes: this.dataTypes,
                compositeReferences: this.compositeReferences

            }
        },

        getDefaultLanguage() {
            return this.application.defaultLanguage
        }
    },
    actions: {
        setYaml(yaml) {
            this.application = yaml.application
            this.references = yaml.references
            this.dataTypes = yaml.dataTypes
            this.compositeReferences = yaml.compositeReferences
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
            this.references = {}
            this.dataTypes = {}
            this.compositeReferences = {}
        },

        addReference(index, reference) {
            this.references[index] = reference
        }
    }
})
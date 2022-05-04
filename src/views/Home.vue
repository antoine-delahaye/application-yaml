<script>
  import {parseDocument} from 'yaml'

  export default {
    data() {
      return {
        t: this.i18n.t,
        isSelecting: false,
        selectedFile: null
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
      }
    },

    methods: {
      handleFileImport() {
        this.isSelecting = true
        window.addEventListener('focus', () => {
          this.isSelecting = false
        }, {once: true})
        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedFile = e.target.result
          this.yamlStore.resetYaml()
          this.yamlStore.setYaml(parseDocument(this.selectedFile).toJSON())
        }
        reader.readAsText(e.target.files[0])
        this.$router.push('/application')
      }
    }
  }
</script>

<template>
  <v-main class="d-flex align-center">
    <v-container fluid>
      <v-card max-width="40rem" class="mx-auto">
        <v-card-title v-text="t('home.title')"/>
        <v-card-content v-text="t('home.content')"/>
        <v-card-actions class="d-flex justify-center">
          <input ref="uploader" class="d-none" type="file" @change="onFileChanged"/>
          <v-btn prepend-icon="mdi-upload" color="primary" :loading="isSelecting" @click="handleFileImport">
            {{ t('button.upload') }}
          </v-btn>
          <v-btn prepend-icon="mdi-plus" color="primary" @click="yamlStore.resetYaml" to="/application">
            {{ t('button.new') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
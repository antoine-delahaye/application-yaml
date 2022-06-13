<div align="center">
  <img src="src/assets/favicon.png" alt="Favicon" width="80"/>
  <h1>
    <a href="https://forgemia.inra.fr/anaee-dev/implementations-si-ore/si_v2_tools/si-ore-v2-yaml-configuration">
      Application YAML
    </a>
  </h1>
  <p>
    Application permettant de générer le fichier de configuration pour OpenADOM.
  </p>
  <p>
    <strong>Développé par Antoine Delahaye.</strong>
  </p>
</div>

<br/>

<details>
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#pour-commencer">Pour commencer</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#commandes-utiles">Commandes utiles</a></li>
      </ul>
    </li>
    <li>
      <a href="#à-propos">À propos</a>
      <ul>
        <li><a href="#dépendances">Dépendances</a></li>
        <li><a href="#structure">Structure</a></li>
        <li><a href="#fonctionnement">Fonctionnement</a></li>
        <li><a href="#maintenance">Maintenance</a></li>
      </ul>
    </li>
  </ol>
</details>

## Pour commencer

### Prérequis

- NodeJS
  ```shell
  # Debian
  sudo apt install nodejs
  
  # Arch
  sudo pacman -S nodejs
  ```

- NPM
  ```shell
  # Debian
  sudo apt install nodejs
  
  # Arch
  sudo pacman -S nodejs
  ```

- Pandoc
  ```shell
  # Debian
  sudo apt install pandoc texlive
  
  # Arch
  sudo pacman -S pandoc texlive-core
  ```

### Commandes utiles

- Installer le projet
  ```shell
  npm install
  ```

- Lancer le serveur en mode développement
  ```shell
  npm run dev
  ```

- Lancer Cypress
  ```shell
  cypress open
  ```

- Générer le PDF du README
  ```shell
  pandoc README.md -o docs/files/Documentation.pdf -V fontsize=12pt -V linestretch=1 -V linkcolor=black --number-sections --table-of-contents -V documentclass=scrreprt -V lang=french
  ```

- Générer le PDF du rapport
  ```shell
  pandoc docs/report.md -o docs/files/Rapport.pdf -V fontsize=12pt -V linestretch=1 -V linkcolor=black --number-sections --table-of-contents -V documentclass=scrreprt -V lang=french
  ```

## À propos

### Dépendances

- [Vite](https://vitejs.dev/)
- [VueJS](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vuetify](https://next.vuetifyjs.com/)
- [Vue i18n](https://vue-i18n.intlify.dev/)
- [Cypress](https://www.cypress.io/)
- [Vue3 Cookies](https://github.com/KanHarI/vue3-cookies)
- [YAML](https://github.com/eemeli/yaml)
- [Vue3 JSON Viewer](https://github.com/qiuquanwu/vue3-json-viewer)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js)

### Structure

```shell
├── cypress
│   ├── integration # Tests d'intégration
│   └── ... # D'autres dossiers relatifs à Cypress comme les fixtures, les screenshots, ect
├── index.css # Fichier CSS contenant la déclarations des polices de caractères de l'INRAE
├── src
│   ├── App.vue
│   ├── assets # Dossiers contenant les assets comme les images et polices de caractères
│   ├── components # Composants réutilisables
│   ├── locales # Dossier contenant les fichiers de traduction
│   │   ├── en.json
│   │   └── fr.json
│   ├── main.js # Fichier JavaScript principal contenant tout les imports et déclarations
│   ├── store
│   │   └── yaml.js # Store de l'application représentant un fichier YAML
│   ├── styles
│   │   ├── theme.ts # Tests d'intégration
│   │   └── ...
│   ├── utils.js # Fonctions réutilisables
│   └── views # Vues de l'application
├── vite.config.js # Fichier de configuration de Vite
└── ...
```

### Fonctionnement

### Maintenance

<div align="center">
  <img src="src/assets/logo_primary.svg" alt="Logo" width="150"/>
</div>
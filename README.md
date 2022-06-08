# Application YAML

Application permettant de générer le fichier de configuration pour OpenADOM.

<details>
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#à-propos-du-projet">À propos du projet</a>
      <ul>
        <li><a href="#technologies-utilisées">Technologies utilisées</a></li>
      </ul>
    </li>
    <li>
      <a href="#pour-commencer">Pour commencer</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#commandes-utiles">Commandes utiles</a></li>
      </ul>
    </li>
  </ol>
</details>

## À propos du projet

### Technologies utilisées

## Pour commencer

#### Prérequis

### Installation

### Commandes utiles

```shell
# Lancer le serveur en mode développement
npm run dev
```

```shell
# Lancer Cypress
cypress open
```

```shell
# Générer le PDF du README
pandoc README.md -o docs/files/Documentation.pdf -V fontsize=12pt -V linestretch=1 -V linkcolor=black --number-sections --table-of-contents -V documentclass=scrreprt -V lang=french

# Générer le PDF du rapport
pandoc docs/report.md -o docs/files/Rapport.pdf -V fontsize=12pt -V linestretch=1 -V linkcolor=black --number-sections --table-of-contents -V documentclass=scrreprt -V lang=french
```
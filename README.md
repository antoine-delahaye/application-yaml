# Application YAML

Application permettant de générer le fichier de configuration pour l'application ORE SI v2

```shell
# Lancer le serveur
npm run dev
```

```shell
# Générer le PDF du README
pandoc README.md -o docs/files/Documentation.pdf -V fontsize=12pt -V linestretch=1 -V linkcolor=black --number-sections --table-of-contents -V documentclass=scrreprt -V lang=french

# Générer le PDF du rapport
pandoc docs/report.md -o docs/files/Rapport.pdf -V fontsize=12pt -V linestretch=1 -V linkcolor=black --number-sections --table-of-contents -V documentclass=scrreprt -V lang=french
```
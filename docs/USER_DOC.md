---
title: Manuel utilisateur de l'application permettant de générer des fichiers de configuration pour OpenADOM
author: Antoine DELAHAYE
date: |
  ![](src/assets/logo_primary.svg){ height=64px }

lang: fr
numbersections: true
documentclass: scrreprt
toc: true
fontsize: 12pt
linestretch: 1
linkcolor: black
---

# Éléments de navigation

## Entête

L'entête contient trois boutons :

- Un bouton pour masquer/afficher le menu latéral de navigation
- Un bouton pour revenir au menu principal
- Un bouton pour choisir la langue d'affichage

![](docs/images/user-doc/header.png)

## Menu latéral de navigation

Le menu latéral de navigation contient les différents onglets de navigation :

- Application, qui contient les informations de l'application
- Référentiels, afin d'afficher les référentiels et d'en importer/créer de nouveaux
- Types de données, afin d'afficher les types de données et d'en importer/créer de nouveaux
- Références composites qui n'est pas actif étant donné que cette partie n'est pas implémentée
- Visualisation, qui permet de visualiser le fichier en cours de création ainsi que des raccourcis pour les différentes
  données
- Téléchargement, qui permet de télécharger le fichier en cours de création

![](docs/images/user-doc/menu.png)

# Pages

## Accueil

Sur la page d'accueil, il est possible d'importer un fichier de configuration existant pour le modifier, de continuer
l'éditer d'un fichier en cours de création ou de créer un nouveau fichier.

![](docs/images/user-doc/home.png)

Si l'on souhaite créer un nouveau fichier ou que l'on importe un fichier qui ne spécifie pas la langue par défaut, un
popup apparaît afin de choisir la langue. **Attention, il ne sera plus possible de modifier la langue après l'avoir
choisie**.

![](docs/images/user-doc/language-selection.png)

## Application

La page Application permet d'affiche la version du fichier de configuration, la langue par défaut ainsi que des champs
de texte pour nommer l'application.

![](docs/images/user-doc/application.png)

## Référentiels

Un tableau contenant les référentiels existants est affiché. Il est possible de modifier ou supprimer un référentiel.

![](docs/images/user-doc/references.png)

Depuis cette page il est possible de créer un nouveau référentiel, soit à partir de rien, soit à partir d'un fichier
CSV. **Attention, après avoir importé le fichier, il est nécessaire de spécifier la ligne contenant les entêtes des
colonnes**.

![](docs/images/user-doc/row-number.png)

Lorsque l'on veut créer un nouveau référentiel, il faut d'abord spécifier le nom du référentiel sur le premier onglet.

![](docs/images/user-doc/reference-name.png)

Ensuite, il va être possible d'ajouter/éditer des colonnes au référentiel. Les contraintes sont optionnelles.
**Attention, il est nécessaire d'avoir spécifié au moins une colonne clé pour ajouter le référentiel**.

![](docs/images/user-doc/add-column.png)

## Visualisation

Cette page permet de visualiser le fichier en cours de création. Il est aussi possible d'accéder aux données des
référentiels et de les éditer.

![](docs/images/user-doc/vizualisation.png)

## Téléchargement

Lorsque que la création ou l'édition du fichier est finie, il est possible de télécharger le fichier.

![](docs/images/user-doc/download.png)
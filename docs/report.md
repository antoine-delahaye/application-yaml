% Développement d'une application VueJS permettant de générer des fichiers de configuration pour OpenADOM
% Antoine DELAHAYE
% Stage du 04/04/2022 au 29/07/2022

# Remerciements

Je souhaite tout d’abord remercier mon maître de stage, Monsieur Philippe TCHERNIATINSKY, de m’avoir permis
de rejoindre son équipe afin de travailler sur des projets tous plus intéressants et variés les uns que les autres.

Je remercie toute l’équipe INFOSOL avec qui j’ai beaucoup appris lors de mon stage.

Je remercie aussi tout le personnel de l’INRAE avec lesquels j’ai pu travailler ou discuter.

# Introduction

Étudiant en troisième année de licence Informatique à l’Université d’Orléans, j’ai réalisé un stage de quatre mois, du 4
avril
au 29 juillet, à l'INRAE Val de Loire à Ardon, au sein de l’unité INFOSOL.

Mon rôle dans cette équipe était de m’occuper du développement d’une application web permettant l’aide
à la création de fichier de configuration pour les applications du SI ORE (Observatoire de Recherche en Environnement).

# Structure d'accueil

## L'INRAE

INRAE, l’Institut National de la Recherche Agronomique Environnementale est né le 1<sup>er</sup> janvier 2020.
Il est issu de la fusion entre l’INRA, Institut National de la Recherche Agronomique et IRSTEA, Institut national de
Recherche
en Sciences et Technologies pour l’Environnement et l’Agriculture.

L'INRA a été créé en réponse aux pénuries alimentaires provoquées par la fin de la Seconde Guerre mondiale : combiner
science
et technologie pour améliorer les techniques agricoles et d'élevage. Une fois cette question résolue, les objectifs de
l'INRA
ont changé et plusieurs missions ont été confiées à l'organisme. Ces missions couvrent un large éventail de domaines
tels
que les sols, le changement climatique, le carbone renouvelable, les systèmes agricoles à haute performance
environnementale, l'eau, la biodiversité, l'alimentation humaine, les biotechnologies végétales et les maladies
émergentes.

En février 2018, les présidents d'IRSTEA et de l'INRA sont chargés par les ministres de l'Agriculture et de la Recherche
de fusionner leurs deux instituts en une seule entité, et d'ici à 2020 leurs recommandations ont été formulées dans un
rapport
au régulateur en octobre 2018. En 2019, il a été annoncé que le 1<sup>er</sup> janvier 2020, l'organisation combinée
serait connue
sous le nom d'Institut national de l'agronomie de l'environnement (INRAE). Le décret de fusion formelle a été signé
le 10 octobre 2019 et la fusion a pris effet le 1<sup>er</sup> janvier 2020.

Aujourd'hui l'INRA regroupe dix-huits centres régionaux (en plus de son siège à Paris) répartis sur plus de
150 sites et emploi environ 8200 titulaires ainsi que de nombreux doctorants (environ 500) et stagiaires (environ 2600).

Pour ce qui est de l'INRAE Val de Loire, elle compte 800 agents dont 632 titulaires et regroupe quatre pôles :

- Dynamique des sols et gestion de l'environnement
- Biologie integrative des arbres et organismes associés
- Infectiologie et one health
- Biologie animale intégrative et durabilité des systèmes d'élevage

## L'unité INFOSOL

J'ai donc réalisé mon stage au sein de l'équipe ORE, cette dernière fait partie de l'unité INFOSOL. Les activités de
l'unité INFOSOL s'exercent dans le cadre de la participation de l'INRAE à un Groupement d'Intérêt Scientifique Sol (GIS
Sol)
qui propose un ensemble de programmes nationaux pour faciliter et encourager une gestion patrimoniale et durable des
sols.

L'unité INFOSOL réalise ou coordonne l'acquisition des données nécessaires à la constitution de ce
système d'information. Elle assure le contrôle de la qualité de ces données. Elle crée et alimente les
bases de données permettant l'archivage et l'exploitation des informations. Elle assure l'accès aux
demandeurs dans le respect des règles de la déontologie et des conventions passées avec les
partenaires des programmes qu'elle conçoit. Elle contribue à leur diffusion et à leur valorisation en
assurant notamment l'articulation avec les bases de connaissances sur les sols et les outils
d'exploitation thématique produits par les recherches de l'Institut.

# Environnement de travail

Afin de pouvoir travailler dans de bonnes conditions, j'ai partagé pendant ma période de stage un bureau de travail avec
Madame BOUKIR Hakima, développeuse pour l'équipe SI Sol.

![Mon bureau de travail](docs/images/desk.jpg)

Concernant mon outil de travail, il s'agit d'un ordinateur portable Dell de 15,6 pouces sous Linux afin d'installer tous
les paquets necessaries pour faire du développement d'application web. En plus de ça, j'ai à disposition une station
d'accueil à mon bureau afin de pouvoir brancher un écran externe de 27 pouces, un clavier et une
souris, tout en alimentant mon ordinateur avec un seul cable.

![Mon ordinateur](docs/images/computer.jpg)

# Sujet

## Introduction

Comme expliqué precedent, la mission générale de l'unité INFOSOL est de constituer et de gérer un
système d'information à vocation nationale et européenne sur les sols, par rapport à leur distribution spatiale, leurs
propriétés et l'évolution de leur qualité. La mission de l'unité a été élargie aux données environnementales et aux
données des pratiques culturales. De ce fait, afin de répondre à ces exigences, l'équipe des ORE a été chargé de
développer outil permettant de gérer ces données. C'est de là qu'est né OpenADOM (Application for Data Organization and
Management).

OpenADOM est donc avant tout une API REST, c'est-à-dire un style d'architecture logicielle définissant un ensemble de
contraintes à utiliser pour créer des services web permettant de générer une application pour stocker, gérer et
visualiser
des données à partir d'un fichier de configuration. Ce fichier de configuration permettant de décrire les données à
stocker, leurs types, leurs relations, leurs relations entre les données, leurs relations avec des données, ect.
Le format utilisé par ce fichier est le YAML, il s'agit d'un format de représentation de données simple et facile à
comprendre. Cependant, l'écriture d'un tel fichier est très fastidieuse. En effet, ce dernier relativement
complexe étant donné qu'il est chargé de décrire la structure d'une application, il est possible de se retrouver avec
des fichiers faisant plusieurs milliers de lignes.

```yaml
version: 1
application:
  defaultLanguage: fr
  internationalizationName:
    fr: SOERE mon SOERE avec dépôt
    en: SOERE my SOERE with repository
  name: MONSORE
  version: 1
compositeReferences:
  sites:
    components:
      - reference: type_de_sites
        parentRecursiveKey: null
      - parentKeyColumn: tze_type_nom
        parentRecursiveKey: zet_chemin_parent
        reference: sites
  projet:
    components:
      - reference: projet
```

C'est donc à partir du constat que la création d'un tel fichier est se révèle trop complexe qu'il m'a été demandé de
développer une application permettant de guider pas à pas l'utilisateur dans la création de ce fichier.

## Structure du fichier de configuration



## Maquettage

## Développement et tests

## Documentation

# Bilan

# Conclusion
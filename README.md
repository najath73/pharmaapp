# Documentation des Endpoints de l'API

Bienvenue dans la documentation des endpoints de l'API de notre application.

## Table des matières

- [Authentification](#authentification)
  - [Connexion](#connexion)
- [Utilisateurs](#utilisateurs)
  - [Créer un Nouvel Utilisateur](#créer-un-nouvel-utilisateur)
  - [Obtenir un Utilisateur par son ID](#obtenir-un-utilisateur-par-son-id)
  - [Mettre à Jour un Utilisateur](#mettre-à-jour-un-utilisateur)
  - [Supprimer un Utilisateur](#supprimer-un-utilisateur)
- [Produits](#produits)
  - [Obtenir Tous les Produits](#obtenir-tous-les-produits)
  - [Rechercher des Produits](#rechercher-des-produits)
  - [Créer un Nouveau Produit](#créer-un-nouveau-produit)
  - [Modifier un Produit](#modifier-un-produit)
- [Pharmacies](#pharmacies)
  - [Obtenir Toutes les Pharmacies](#obtenir-toutes-les-pharmacies)
  - [Créer une Nouvelle Pharmacie](#créer-une-nouvelle-pharmacie)
  - [Obtenir une Pharmacie par son ID](#obtenir-une-pharmacie-par-son-id)
  - [Modifier une Pharmacie](#modifier-une-pharmacie)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Authentification

### Connexion

- **Endpoint:** `POST /api/login`
  
  Permet à un utilisateur de se connecter et de recevoir un jeton JWT valide.

  #### Paramètres de la Requête
  - `email` : Email de l'utilisateur (chaîne de caractères, requis)
  - `motDePasse` : Mot de passe de l'utilisateur (chaîne de caractères, requis)

  #### Réponse
  Retourne un jeton JWT valide si l'authentification est réussie.

## Utilisateurs

### Créer un Nouvel Utilisateur

- **Endpoint:** `POST /api/users`
  
  Permet de créer un nouvel utilisateur dans le système.

  #### Paramètres de la Requête
  - `nom` : Nom de l'utilisateur (chaîne de caractères, requis)
  - `prenom` : Prenom de l'utilisateur (chaîne de caractères, requis)
  - `email` : Email de l'utilisateur (chaîne de caractères, requis et unique)
  - `motDePasse` : Mot de passe de l'utilisateur (chaîne de caractères, requis)

  #### Réponse
  Retourne les détails de l'utilisateur créé.


## Produits

### Obtenir Tous les Produits

- **Endpoint:** `GET /api/produits`
  
  Retourne tous les produits disponibles dans le système.

  #### Réponse
  Retourne une liste de produits.

### Rechercher des Produits

- **Endpoint:** `GET /api/produits/recherche`
  
  Permet de rechercher des produits dans le système en fonction d'un terme de recherche.

  #### Paramètres de la Requête
  - `q` : Terme de recherche (chaîne de caractères, requis)

  #### Réponse
  Retourne une liste de produits correspondant au terme de recherche.

### Créer un Nouveau Produit  (Protéger par authentification)

- **Endpoint:** `POST /api/produits`
  
  Permet de créer un nouveau produit dans le système.

  #### Paramètres de la Requête
  - `nom` : Nom du produit (chaîne de caractères, requis)
  - `composant` : Composant du produit (chaîne de caractères, optionnel)
  - `prix` : Prix du produit (chaîne de caractères, optionnel)
  - `categorie` : Catégorie du produit (chaîne de caractères, optionnel)

  #### Réponse
  Retourne les détails du produit créé.

### Modifier un Produit (Protéger par authentification)

- **Endpoint:** `PUT /api/produits/:id`
  
  Permet de modifier un produit existant dans le système.

  #### Paramètres de la Requête
  - `nom` : Nouveau nom du produit (chaîne de caractères, requis)
  - `composant` : Nouvelle description du produit (chaîne de caractères, optionnel)
  - `prix` : Nouveau prix du produit (chaîne de caractères, optionnel)
  - `categorie` : Nouvelle categorie du produit (chaîne de caractères, optionnel)

  #### Réponse
  Retourne les détails du produit modifié.

## Pharmacies

### Obtenir Toutes les Pharmacies

- **Endpoint:** `GET /api/pharmacies`
  
  Retourne toutes les pharmacies disponibles dans le système.

  #### Réponse
  Retourne une liste de pharmacies.

### Créer une Nouvelle Pharmacie (Protéger par authentification)

- **Endpoint:** `POST /api/pharmacies`
  
  Permet de créer une nouvelle pharmacie dans le système.

  #### Paramètres de la Requête
  - `nom` : Nom de la pharmacie (chaîne de caractères, requis)
  - `adresse` : Adresse de la pharmacie (chaîne de caractères, requis)
  - `telephone` : Téléphone de la pharmacie (chaîne de caractères, requis)

  #### Réponse
  Retourne les détails de la

# Monday.com Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Cas d'usage métiers
- **Automatisation RH** : Lancer l'envoi d'un contrat de travail lorsqu'une ligne Monday passe au statut "Embauché".
- **Suivi des ventes** : Mettre à jour automatiquement le statut d'une opportunité dans Monday dès qu'un devis est signé dans eZsign.
- **Gestion de projets** : Joindre les documents signés directement dans les colonnes "Fichiers" de Monday pour centraliser les livrables.
- **Tableaux de bord de signature** : Visualiser l'avancement global des signatures à travers des colonnes de statut synchronisées en temps réel.

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Changement de statut d'une cellule dans un tableau Monday.com.
- `document.completed` -> Mise à jour du lien de téléchargement sécurisé dans une colonne "Fichier" ou "Lien" de Monday.
- `folder.completed` -> Marquer l'élément Monday comme "Terminé" et notifier le gestionnaire du tableau.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier la validité et les permissions de la session d'intégration Monday.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document à partir des données d'une ligne d'un tableau Monday.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un modèle eZsign prédéfini (ex: Contrat standard) à un document généré depuis Monday.

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement sécurisée pour l'inclure dans les colonnes de Monday Files.

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer les contacts (e-mail/nom) d'une colonne Monday en tant que signataires du dossier.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les modèles disponibles pour les automatisations ou les sélections manuelles dans Monday.

### 7. Ezsignfolder_Send_V3
- **POST** `/3/object/ezsignfolder/{pkiEzsignfolderID}/send`
- **Summary :** Envoyer le dossier complet aux signataires après l'initialisation depuis Monday.

## Actions Monday.com
- **Trigger Signature** : Automatisation Monday du type "When Status changes, trigger eZsign Signature Request" utilisant `Ezsigndocument_CreateObject_V2`.
- **Status Sync** : Les webhooks eZsign mettent à jour la colonne Monday "Signature Status" via l'API de Monday.
- **File Attachment** : Téléchargement automatique du PDF final vers Monday en utilisant `Ezsigndocument_GetDownloadUrl_V1`.

## Procédure pour créer un connecteur Monday.com
1. Accédez au **Monday Developer Center**.
2. Créez une nouvelle application ou sélectionnez-en une existante.
3. Sous l'onglet **App Features**, ajoutez une **Integration**.
4. Configurez vos "Integration Recipes" (Automatisations) :
    - Définissez les triggers Monday (ex: "When status changes to Done").
    - Associez les actions eZsign définies dans `generated-actions.json`.
5. Configurez l'authentification OAuth2 avec les URLs fournies dans la section "Authentification".
6. Mappez les colonnes Monday (Email, Nom, Dossier) vers les champs eZsign correspondants.
7. Testez la connexion avec l'endpoint `/2/object/activesession/getCurrent`.
8. Installez l'application sur vos tableaux Monday spécifiques.

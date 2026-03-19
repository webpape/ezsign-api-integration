# Monday.com Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Changement de statut d'une cellule Monday.com.
- `document.completed` -> Mise à jour du lien de signature dans la colonne "Lien" de Monday.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier la validité de la session d'intégration Monday.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document à partir d'une ligne d'un tableau Monday.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template eZsign prédéfini (ex: Document RH).

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement sécurisée pour Monday Files.

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (Contact dans une colonne Monday) à un dossier.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates disponibles dans les automatisations Monday.

## Actions Monday.com
- **Trigger Signature :** Automatisation du type "When Status changes, trigger eZsign Signature Request" utilisant `Ezsigndocument_CreateObject_V2`.
- **Status Sync :** Les webhooks eZsign mettent à jour la colonne Monday "Signature Status".


## Procédure pour créer un connecteur Monday
1. Accédez au portail développeur de Monday.
2. Créez une nouvelle intégration / application.
3. Importez le fichier `swagger.json` de ce dossier pour définir les points de terminaison.
4. Configurez l'authentification (OAuth2 ou Clé API) en utilisant les paramètres eZmax.
5. Testez la connexion avec l'endpoint `/2/object/activesession/getCurrent`.

# Zapier & Make Connectors Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Déclenchement d'un workflow Zap/Scenario.
- `document.completed` -> Récupération du fichier final pour transfert vers Cloud Storage.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Authentification de la session Zapier/Make.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Action de création de document eZsign.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template eZsign.

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Fournir l'URL de téléchargement (Original, Signed, Proof, etc.).

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Ajouter un signataire dynamiquement à partir d'une autre application.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates pour sélection dans l'interface Zapier/Make.

## Actions Automation
- **Multi-step Workflow :** Utilisation des `definitions.json` et `blueprint.json` (déjà générés) pour l'import direct.
- **Dynamic Webhooks :** Abonnement aux webhooks eZsign via l'API REST.

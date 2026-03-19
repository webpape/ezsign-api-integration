# Make (Integromat) Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://api.ezsign.ca/oauth/authorize`
- **Token URL :** `https://api.ezsign.ca/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Déclenchement d'un scenario Make.
- `document.completed` -> Récupération du document final pour archivage.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Authentification de la session Make.

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
- **Summary :** Ajouter un signataire dynamiquement à partir d'un autre module Make.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates pour sélection dans l'interface Make.

## Actions Automation
- **Scenario Integration :** Utilisation du `blueprint.json` (déjà généré) pour l'import direct.
- **Dynamic Webhooks :** Abonnement aux webhooks eZsign via l'API REST.

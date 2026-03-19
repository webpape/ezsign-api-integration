# NetSuite Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Token-based Authentication / OAuth 2.0)
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Mise à jour du Custom Record NetSuite.
- `document.completed` -> Signature finale et archivage du PDF dans le File Cabinet de NetSuite.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Authentification de la session NetSuite.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Action de création de document à partir d'un Sales Order ou Invoice NetSuite.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template eZsign.

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Fournir l'URL de téléchargement sécurisée.

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (Entity/Customer NetSuite).

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates pour sélection dans SuiteScript.

## Actions NetSuite
- **SuiteScript Integration :** Déclenché via un bouton ou User Event Script.
- **Dynamic Webhooks :** Abonnement via RESTlets NetSuite.

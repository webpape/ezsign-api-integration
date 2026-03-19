# HubSpot Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Mise à jour du Deal HubSpot.
- `document.rejected` -> Notification dans HubSpot.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Récupérer les détails de la session active.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document eZsign.
- **Détails :** Permet la création de plusieurs éléments à la fois.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template à un document.

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement (Original, Signed, Proof, etc.).

### 5. Ezsignfolder_CreateObject_V2
- **POST** `/2/object/ezsignfolder`
- **Summary :** Créer un nouveau dossier eZsign.

### 6. Ezsignfoldertype_GetAutocomplete_V2
- **GET** `/2/object/ezsignfoldertype/getAutocomplete/{sSelector}`
- **Summary :** Récupérer la liste des types de dossiers pour les listes déroulantes.

## Actions HubSpot
- **Send for Signature :** Utilise `Ezsigndocument_CreateObject_V2`.
- **Sync Status :** Utilise les webhooks eZsign pour déclencher des mises à jour via l'API HubSpot.


## Procédure pour HubSpot
1. Utilisez le CLI HubSpot : `yarn hs`
2. Créez une "Private App" ou une application publique.
3. Importez les définitions d'API si nécessaire pour les "Custom Objects".

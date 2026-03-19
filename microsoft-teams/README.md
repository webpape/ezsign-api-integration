# Microsoft Teams Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Envoi automatique d'Adaptive Cards dans les canaux Teams.
- `document.completed` -> Message final avec lien de téléchargement.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier les permissions de l'application Teams intégrée.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Déclencher une signature via une Task Module ou Message Shortcut Teams.

### 3. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Fournir un lien de téléchargement sécurisé dans le chat Teams (expire après 5 min).

### 4. Ezsignfoldertype_GetAutocomplete_V2
- **GET** `/2/object/ezsignfoldertype/getAutocomplete/{sSelector}`
- **Summary :** Liste déroulante des types de dossiers dans les formulaires de création Teams.

### 5. Ezsigntemplateglobal_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplateglobal/getAutocomplete/{sSelector}`
- **Summary :** Sélectionner un template global eZmax pour les documents de collaboration.

## Actions Teams
- **Interactive Notifications :** Utilise les webhooks eZsign mappés vers les Activity Feeds ou Channel Messages.
- **Teams Bot :** Utilise `Ezsigndocument_GetDownloadUrl_V1` pour répondre aux requêtes de statut.

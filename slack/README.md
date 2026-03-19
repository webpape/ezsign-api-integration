# Slack & Microsoft Teams Connectors Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Envoi automatique de notifications (Adaptive Cards pour Teams, Block Kit pour Slack).
- `document.completed` -> Message final incluant le lien de téléchargement.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier les permissions de l'application Slack/Teams intégrée.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Déclencher une signature via une commande Slash ou Message Shortcut.

### 3. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Fournir un lien de téléchargement sécurisé directement dans le canal de communication.

### 4. Ezsignfoldertype_GetAutocomplete_V2
- **GET** `/2/object/ezsignfoldertype/getAutocomplete/{sSelector}`
- **Summary :** Liste déroulante des types de dossiers dans les formulaires de création.

### 5. Ezsigntemplateglobal_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplateglobal/getAutocomplete/{sSelector}`
- **Summary :** Sélectionner un template global eZmax pour les documents standards.

## Actions Slack/Teams
- **Real-time Alert :** Utilise les webhooks eZsign mappés vers l'API de messagerie.
- **Bot Interactions :** Commande `/ezsign-status` utilisant `Ezsigndocument_GetDownloadUrl_V1`.

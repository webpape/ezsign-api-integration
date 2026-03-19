# Freshdesk & Zendesk Connectors Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://api.ezsign.ca/oauth/authorize`
- **Token URL :** `https://api.ezsign.ca/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Mise à jour du ticket (Note interne ou Statut).
- `document.completed` -> Signature finale et archivage du PDF dans les pièces jointes du ticket Support.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active Support-eZsign.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document à partir d'un ticket de support.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template eZsign (ex: Autorisation de Service).

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement sécurisée (expire après 5 min).

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (Demandeur du ticket).

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates disponibles dans les macros Support.

## Actions Support (Freshdesk/Zendesk)
- **Ticket Sync :** Les webhooks eZsign mettent à jour le champ personnalisé "Signature Status".
- **Internal Note :** Ajout automatique d'une note interne lors de chaque étape de la signature.

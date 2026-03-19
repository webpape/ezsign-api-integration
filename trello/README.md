# Trello Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Déplacement de la carte Trello.
- `document.completed` -> Signature et archivage du PDF dans les pièces jointes de la carte.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active Trello-eZsign.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document à partir d'une carte Trello.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template eZsign prédéfini (ex: Accord de Collaboration).

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement sécurisée (expire après 5 min).

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (Membre de la carte Trello).

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates disponibles dans les automatisations Butler Trello.

## Actions Trello
- **Butler Trigger :** "When a card is moved to 'To Sign', trigger eZsign Signature Request" utilisant `Ezsigndocument_CreateObject_V2`.
- **Card Updates :** Les webhooks eZsign mettent à jour le statut de la signature via des commentaires ou étiquettes.

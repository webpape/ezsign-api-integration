# Jira, ClickUp, Trello & Asana Connectors Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Transition d'état de la tâche/ticket (ex: To Do -> In Progress).
- `document.completed` -> Signature finale et archivage du PDF dans l'outil.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier les permissions de l'application de gestion de projet.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un document à partir d'un ticket ou d'une tâche existante.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template eZsign (ex: Spécifications Techniques).

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Obtenir le lien de téléchargement (Original, Signed, Proof, etc.).

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (Assigné de la tâche ou Contact associé).

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates disponibles dans les automatisations de projet.

## Actions Project Management
- **Issue/Task Sync :** Utilise les webhooks eZsign pour déclencher des commentaires automatiques sur le ticket.
- **Bot Interactions :** Commande `/ezsign-check` pour vérifier le statut de la signature.

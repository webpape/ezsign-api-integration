# Make Integration - eZsign

## Cas d'usage métiers
- **Automatisation Multi-Apps :** Connectez eZsign à plus de 1000 applications (Google Drive, Slack, CRM propriétaire) sans code.
- **Workflow Documentaire :** Générez un document à partir d'un Google Doc, envoyez-le via eZsign, et archivez le résultat dans Dropbox.
- **Notification Cross-Platform :** Recevez une notification SMS (via Twilio) ou un message Teams dès qu'un document est signé.

## Procédure d'installation
1. **Compte Make :** Connectez-vous à votre compte [Make](https://www.make.com/).
2. **Custom App (Optionnel) :** Si vous souhaitez créer votre propre module, allez dans le [App Federation](https://www.make.com/en/help/apps/app-federation).
3. **HTTP Request :** Vous pouvez utiliser le module "HTTP > Make an OAuth 2.0 request" avec les paramètres ci-dessous.
4. **Import Blueprint :** Utilisez le fichier `blueprint.json` de ce dossier pour importer un scénario pré-configuré dans votre organisation.
5. **Mapping :** Utilisez les sorties des modules précédents (ex: Google Forms) pour remplir les champs de l'action eZsign.

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `ezsignfolder.completed` -> Déclencher la suite du scénario Make (ex: mise à jour d'un Google Sheet).
- `ezsigndocument.completed` -> Récupérer le contenu binaire du document signé pour transfert vers un autre service de stockage.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active pour Make.

### 2. Ezsignfolder_CreateObject_V3
- **POST** `/3/object/ezsignfolder`
- **Summary :** Créer un nouveau dossier eZsign via un module Make.

### 3. Ezsigndocument_CreateObject_V3
- **POST** `/3/object/ezsigndocument`
- **Summary :** Ajouter des documents au dossier à partir de données binaires Make.

### 4. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer des signataires dynamiquement.

### 5. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Obtenir l'URL pour que le module HTTP de Make puisse télécharger le fichier.

## Actions Automation
- **Scenario Integration :** Importez le `blueprint.json` pour un démarrage rapide.
- **Error Handling :** Configurez des "Error handlers" dans Make pour gérer les rejets de signature eZsign.

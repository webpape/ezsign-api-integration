# ClickUp Integration - eZsign

## Cas d'usage métiers
- **Gestion de Projet :** Envoyez des contrats de sous-traitance ou des approbations de jalons directement depuis vos tâches ClickUp.
- **Opérations Agency :** Automatisez la signature de bons de commande (SOW) liés à des tâches de production.
- **Immobilier :** Gérez les baux et contrats en liant les documents eZsign aux tâches de gestion de propriétés.

## Procédure d'installation
1. **Accès Développeur :** Rendez-vous dans les paramètres de votre Workspace ClickUp > Apps.
2. **Créer une App :** Cliquez sur "Create New App". Nommez-la "eZsign Connector".
3. **Configuration OAuth2 :**
   - Saisissez l'URL de redirection de votre instance eZsign.
   - Copiez le `Client ID` et le `Secret`.
4. **Importation des Actions :** Importez `generated-actions.json` dans votre outil d'intégration (Zapier, Make ou connecteur natif) pour mapper les champs ClickUp aux actions eZsign.
5. **Champs Personnalisés :** Créez un champ "eZsign Status" (Texte) et "eZsign Folder ID" dans votre ClickUp pour le suivi.

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `ezsignfolder.completed` -> Mise à jour du Custom Field "eZsign Status" vers "Signé".
- `ezsigndocument.completed` -> Signature finale et téléchargement vers les pièces jointes de la tâche ClickUp.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active entre ClickUp et eZsign.

### 2. Ezsignfolder_CreateObject_V3
- **POST** `/3/object/ezsignfolder`
- **Summary :** Créer un nouveau dossier eZsign lié à une tâche ClickUp.

### 3. Ezsigndocument_CreateObject_V3
- **POST** `/3/object/ezsigndocument`
- **Summary :** Créer un nouveau document à partir d'un fichier attaché dans ClickUp.

### 4. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (utilisant l'email du champ "Assigné" ou un champ personnalisé).

### 5. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL du document final pour archivage dans ClickUp.

## Actions ClickUp
- **Status Mapping :** Les étapes de signature eZsign mettent à jour le statut de la tâche ClickUp.
- **Task Comments :** Chaque étape (Envoyé, Signé, Complété) ajoute un commentaire automatique à la tâche ClickUp.

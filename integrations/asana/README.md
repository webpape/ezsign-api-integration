# Asana Integration - eZsign

## Cas d'usage métiers
- **Ventes & CRM :** Générez des contrats de vente directement depuis vos tâches Asana pour signature rapide.
- **RH & Onboarding :** Envoyez des documents d'embauche et des politiques d'entreprise aux nouveaux employés.
- **Gestion de Projet :** Faites approuver des jalons de projet ou des changements de portée par vos clients.

## Procédure d'installation
1. **Accès Développeur :** Connectez-vous à la [Console Développeur Asana](https://app.asana.com/0/developer-console).
2. **Créer une App :** Cliquez sur "Nouvelle application". Nommez-la "eZsign Integration".
3. **Configuration OAuth2 :** 
   - Ajoutez l'URL de redirection fournie par votre instance eZsign.
   - Notez le `Client ID` et le `Client Secret`.
4. **Importation des Actions :** Utilisez le fichier `generated-actions.json` de ce dossier pour configurer vos triggers et actions dans l'interface de connecteur d'Asana.
5. **Test :** Utilisez l'action "Vérification de la session" pour valider la connexion.

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `ezsignfolder.completed` -> Marquer la tâche Asana comme "Terminée".
- `ezsigndocument.completed` -> Attacher le document signé à la tâche Asana.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active entre Asana et eZsign.

### 2. Ezsignfolder_CreateObject_V3
- **POST** `/3/object/ezsignfolder`
- **Summary :** Créer un nouveau dossier de signature à partir d'un projet Asana.

### 3. Ezsigndocument_CreateObject_V3
- **POST** `/3/object/ezsigndocument`
- **Summary :** Ajouter un document à signer à partir d'une pièce jointe Asana.

### 4. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (utilisant l'email d'un collaborateur Asana).

### 5. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer le document signé pour l'importer dans Asana.

## Actions Asana
- **Trigger Signature Flow :** Déclenché lorsqu'une tâche est déplacée dans la section "À Signer".
- **Status Sync :** Mise à jour automatique des champs personnalisés "Statut eZsign" via webhooks.

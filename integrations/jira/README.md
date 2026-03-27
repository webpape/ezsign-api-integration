# Jira Integration - eZsign

## Cas d'usage métiers
- **Développement Logiciel :** Faites approuver des spécifications techniques ou des plans de test par les parties prenantes avant le début du sprint.
- **Gestion de Services (JSM) :** Envoyez des formulaires d'approbation de changement ou des accords de niveau de service (SLA) aux clients.
- **Conformité :** Automatisez la signature de rapports d'audit ou de sécurité liés à des tickets Jira.

## Procédure d'installation
1. **Console Développeur Atlassian :** Allez sur le [Portail Développeur Atlassian](https://developer.atlassian.com/console/myapps/).
2. **Créer une App :** Cliquez sur "Create" > "OAuth 2.0 (3LO)". Nommez-la "eZsign for Jira".
3. **Permissions (Scopes) :** Ajoutez les scopes `read:jira-work` et `write:jira-work`.
4. **Configuration OAuth2 :** 
   - Configurez les URLs de rappel (Callback) de votre instance eZsign.
   - Notez le `Client ID` et le `Secret`.
5. **Importation :** Utilisez `generated-actions.json` pour configurer les triggers dans Jira Automation ou via une application Forge.

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `ezsignfolder.completed` -> Effectuer une transition du ticket Jira (ex: "En attente" -> "Approuvé").
- `ezsigndocument.completed` -> Ajouter le PDF signé en pièce jointe au ticket Jira original.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active entre Jira et eZsign.

### 2. Ezsignfolder_CreateObject_V3
- **POST** `/3/object/ezsignfolder`
- **Summary :** Créer un dossier de signature à partir d'un Issue Key Jira.

### 3. Ezsigndocument_CreateObject_V3
- **POST** `/3/object/ezsigndocument`
- **Summary :** Créer un document à partir des fichiers attachés au ticket Jira.

### 4. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer le "Reporter" ou l'"Assignee" du ticket comme signataire.

### 5. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer le lien pour archiver le document dans Jira.

## Actions Jira
- **Issue Sync :** Ajout automatique de commentaires Jira à chaque changement de statut du dossier eZsign.
- **Automation Triggers :** Permet de lancer un workflow eZsign via Jira Automation lors d'un changement d'état.

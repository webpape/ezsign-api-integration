# Freshdesk Integration - eZsign

## Cas d'usage métiers
- **Support Client :** Envoyez des formulaires de décharge de responsabilité ou des approbations de devis directement depuis vos tickets Freshdesk.
- **Service sur Site :** Faites signer des rapports d'intervention liés à des tickets de maintenance.
- **Onboarding Client :** Gérez les contrats de service (SLA) dès l'ouverture d'un ticket de bienvenue.

## Procédure d'installation
1. **Portail Développeur :** Connectez-vous à votre instance Freshdesk et allez dans `Settings > Apps > Custom Apps`.
2. **Créer une App :** Cliquez sur "Create New App". Utilisez le SDK Freshworks si nécessaire ou configurez un connecteur via l'interface.
3. **OAuth2 :** 
   - Utilisez les URLs de l'instance eZmax fournies ci-dessous.
   - Configurez les Scopes requis pour accéder aux dossiers et documents eZsign.
4. **Configuration des Actions :** Importez les définitions de `generated-actions.json` pour permettre aux agents de lancer des processus eZsign depuis la barre latérale du ticket.
5. **Webhooks :** Configurez un webhook dans eZsign pointant vers l'URL d'API Freshdesk pour mettre à jour les tickets.

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `ezsignfolder.completed` -> Ajouter une note interne au ticket Freshdesk : "Document signé avec succès".
- `ezsigndocument.completed` -> Attacher le document final signé au ticket original.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active entre Freshdesk et eZsign.

### 2. Ezsignfolder_CreateObject_V3
- **POST** `/3/object/ezsignfolder`
- **Summary :** Créer un dossier de signature lié au ticket Freshdesk.

### 3. Ezsigndocument_CreateObject_V3
- **POST** `/3/object/ezsigndocument`
- **Summary :** Créer un document à partir des fichiers du ticket Freshdesk.

### 4. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer le demandeur du ticket comme signataire principal.

### 5. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Obtenir le lien pour archiver le document dans le ticket Freshdesk.

## Actions Freshdesk
- **Ticket Sync :** Mise à jour automatique du statut du ticket (ex: de "En attente" à "Ouvert") après signature.
- **Internal Note :** Traçabilité complète des étapes de signature dans l'historique du ticket.

# Pipefy Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Cas d'usage métiers
- **Processus d'approbation budgétaire** : Envoyer automatiquement une demande de signature lorsqu'une carte de demande d'achat entre dans la phase "Approbation".
- **Onboarding RH** : Déclencher la signature de contrats d'employés et de formulaires d'avantages sociaux à partir d'un "Pipe" de recrutement.
- **Gestion de la chaîne d'approvisionnement** : Gérer les ententes avec les fournisseurs et les bons de commande en déplaçant les cartes à travers différentes phases de signature.
- **Support client et tickets** : Faire signer des ententes de niveau de service (SLA) ou des décharges de responsabilité à partir de cartes de support.

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Déplacement automatique de la carte vers la phase suivante du processus Pipefy.
- `document.completed` -> Signature finale confirmée et archivage automatique du PDF final dans la phase d'achèvement.
- `folder.completed` -> Ajout d'un commentaire sur la carte avec le lien de téléchargement sécurisé du document signé.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la validité de la session active pour l'intégration Pipefy-eZsign.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document eZsign à partir des données extraites d'une carte Pipefy.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un modèle eZsign prédéfini (ex: Accord de confidentialité) lors de la création depuis Pipefy.

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement sécurisée pour attacher le document final aux pièces jointes de la carte Pipefy.

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer les signataires identifiés par les champs de formulaire Pipefy au dossier eZsign.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les modèles disponibles pour peupler les automatisations de phase dans Pipefy.

### 7. Ezsignfolder_Send_V3
- **POST** `/3/object/ezsignfolder/{pkiEzsignfolderID}/send`
- **Summary :** Expédier officiellement le dossier aux signataires après la configuration via les triggers Pipefy.

## Actions Pipefy
- **Automation Trigger** : Automatisation Pipefy "When card enters a phase, trigger eZsign document creation" utilisant `Ezsigndocument_CreateObject_V2`.
- **Phase Transition** : Utiliser les webhooks eZsign pour déclencher des déplacements de cartes automatiques via l'API GraphQL de Pipefy.
- **Field Sync** : Mettre à jour les champs de la carte Pipefy (ex: "Date de signature", "Lien PDF") à chaque étape du processus eZsign.

## Procédure pour créer un connecteur Pipefy
1. Connectez-vous à votre compte **Pipefy** et allez dans les paramètres de votre organisation.
2. Accédez à **Integrations** ou utilisez un outil tiers comme Zapier/Make pour connecter Pipefy et eZsign si l'intégration native n'est pas activée.
3. Pour une intégration personnalisée :
    - Utilisez les spécifications d'API fournies dans `generated-actions.json`.
    - Configurez les URLs d'authentification OAuth2 détaillées ci-dessus.
4. Dans vos Pipes (Processus), configurez les **Automations** :
    - Choisissez l'événement déclencheur (ex: "Card enters phase Approbation").
    - Sélectionnez l'action eZsign correspondante.
5. Mappez les champs de vos cartes Pipefy (Email, Nom du Client) vers les paramètres eZsign requis.
6. Configurez les **Webhooks** sortants dans eZsign pour pointer vers les endpoints de réception de Pipefy afin de synchroniser les statuts.
7. Testez l'intégration avec `Activesession_GetCurrent_V2`.

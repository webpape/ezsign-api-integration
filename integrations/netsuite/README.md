# NetSuite Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Token-based Authentication / OAuth 2.0)
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Cas d'usage métiers
- **Contrats de vente (Quote to Cash)** : Générer et envoyer des contrats de vente ou des bons de commande directement depuis une opportunité NetSuite.
- **Facturation électronique** : Faire signer des factures ou des ententes de paiement liées à des enregistrements de factures existants.
- **Gestion des fournisseurs** : Automatiser la signature des contrats d'achat ou des accords de confidentialité (NDA) pour les nouveaux fournisseurs.
- **Archivage automatique** : Sauvegarder automatiquement le document final signé dans le "File Cabinet" de NetSuite, lié à l'enregistrement original (Customer, Vendor, Transaction).

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Mise à jour du statut dans l'enregistrement personnalisé ou la transaction NetSuite.
- `document.completed` -> Signature finale, notification par e-mail au gestionnaire de compte NetSuite.
- `folder.completed` -> Déclenchement de l'archivage du PDF final dans le File Cabinet de NetSuite.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier l'authentification et les permissions de la session pour l'intégration NetSuite.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Action de création de document à partir d'un Sales Order, Invoice ou Customer Record NetSuite.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un modèle eZsign correspondant au type de transaction NetSuite.

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Fournir l'URL de téléchargement sécurisée pour le script d'archivage NetSuite.

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer les entités NetSuite (Clients, Fournisseurs, Employés) en tant que signataires.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les modèles eZsign pour les sélections dynamiques dans SuiteScript.

### 7. Ezsignfolder_Send_V3
- **POST** `/3/object/ezsignfolder/{pkiEzsignfolderID}/send`
- **Summary :** Expédier le dossier pour signature une fois toutes les données NetSuite mappées.

## Actions NetSuite
- **SuiteScript Integration** : Déclenchement de l'envoi via un bouton personnalisé ou un "User Event Script" sur les transactions.
- **RESTlets & Webhooks** : Utilisation de RESTlets pour recevoir les notifications eZsign et mettre à jour les enregistrements NetSuite.
- **File Cabinet Management** : Téléchargement automatique du PDF signé vers le dossier de fichiers NetSuite approprié.

## Procédure pour créer un connecteur NetSuite
1. Accédez à **Setup > Integration > Manage Integrations** dans NetSuite.
2. Créez un nouvel enregistrement d'intégration (New Integration).
3. Activez les fonctionnalités **Token-Based Authentication (TBA)** et/ou **OAuth 2.0**.
4. Configurez les permissions SuiteScript/RESTlet pour permettre la communication avec eZsign.
5. Utilisez les spécifications de `generated-actions.json` pour configurer vos appels d'API sortants (SuiteScript `N/https` module).
6. Configurez l'authentification en utilisant les URLs eZmax fournies dans la section "Authentification".
7. Mappez les champs NetSuite (ex: `entityid`, `email`) vers les paramètres de création eZsign.
8. Testez la connexion avec l'endpoint `Activesession_GetCurrent_V2`.
9. Pour les webhooks, créez un RESTlet public capable de traiter les payloads eZsign entrants.

# QuickBooks Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Validation de la facture QuickBooks (Invoice).
- `document.completed` -> Enregistrement du PDF signé comme pièce jointe dans la transaction QuickBooks.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active QuickBooks-eZsign.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document à partir d'une facture ou d'une estimation QuickBooks.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un template eZsign prédéfini (ex: Termes et Conditions).

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement sécurisée pour attacher le PDF signé à QuickBooks.

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer un signataire (Client QuickBooks) à un dossier.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les templates disponibles dans les automatisations de facturation.

## Actions QuickBooks
- **Trigger Signature :** Automatisation du type "When Invoice is created, send Termes et Conditions for eZsign Signature" utilisant `Ezsigndocument_CreateObject_V2`.
- **Payment Link Mapping :** Mappage du lien de paiement QuickBooks avec le lien de signature eZsign.


## Procédure pour créer un connecteur Quickbooks
1. Accédez au portail développeur de Quickbooks.
2. Créez une nouvelle intégration / application.
3. Importez le fichier `swagger.json` de ce dossier pour définir les points de terminaison.
4. Configurez l'authentification (OAuth2 ou Clé API) en utilisant les paramètres eZmax.
5. Testez la connexion avec l'endpoint `/2/object/activesession/getCurrent`.

# QuickBooks Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Cas d'usage métiers
- **Approbation de devis et estimations** : Envoyer automatiquement une demande de signature lorsqu'un devis est créé dans QuickBooks Online.
- **Signature de contrats de service** : Joindre des termes et conditions à une facture QuickBooks et exiger une signature avant le paiement.
- **Gestion des nouveaux clients** : Faire signer des formulaires d'ouverture de compte ou des autorisations de prélèvement automatique (PAD) lors de la création d'un client dans QuickBooks.
- **Archivage comptable** : Attacher automatiquement le document PDF signé à la transaction correspondante (Facture, Reçu) dans QuickBooks pour un audit facile.

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Mise à jour d'un champ personnalisé ou d'une note dans la facture QuickBooks.
- `document.completed` -> Signature finale confirmée et archivage automatique du PDF final en tant que pièce jointe dans la transaction QuickBooks.
- `folder.completed` -> Changement du statut du devis en "Accepté" dans QuickBooks.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier la validité de la session d'intégration QuickBooks-eZsign.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document à partir des données d'une facture, d'un reçu ou d'une estimation QuickBooks.

### 3. Ezsigndocument_ApplyEzsigntemplate_V2
- **POST** `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate`
- **Summary :** Appliquer un modèle eZsign prédéfini (ex: Conditions de vente) aux documents générés depuis QuickBooks.

### 4. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Récupérer l'URL de téléchargement sécurisée pour attacher le PDF signé à la transaction QuickBooks.

### 5. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer les clients QuickBooks (nom, e-mail) comme signataires du dossier eZsign.

### 6. Ezsigntemplate_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplate/getAutocomplete/{sSelector}`
- **Summary :** Lister les modèles eZsign pour les automatisations de facturation ou de devis.

### 7. Ezsignfolder_Send_V3
- **POST** `/3/object/ezsignfolder/{pkiEzsignfolderID}/send`
- **Summary :** Expédier le dossier complet aux clients une fois les données QuickBooks intégrées.

## Actions QuickBooks
- **Trigger Signature** : Automatisation "When Invoice is created, send eZsign Signature Request" utilisant `Ezsigndocument_CreateObject_V2`.
- **Payment Link Mapping** : Intégrer le lien de paiement QuickBooks dans les notifications eZsign ou vice versa.
- **Attachment Upload** : Utiliser l'API QuickBooks pour télécharger le document final signé dans le "File Cabinet" de la transaction.

## Procédure pour créer un connecteur QuickBooks
1. Connectez-vous au **QuickBooks Developer Portal**.
2. Créez une nouvelle application ou sélectionnez-en une existante.
3. Configurez les **Scopes** nécessaires (com.intuit.quickbooks.accounting).
4. Pour l'intégration eZsign :
    - Utilisez les définitions d'API de `generated-actions.json`.
    - Configurez l'authentification OAuth2 avec les URLs fournies dans la section "Authentification".
5. Mappez les champs QuickBooks (Customer Email, Invoice Number, Total Amount) vers les métadonnées eZsign.
6. Configurez les **Webhooks** QuickBooks pour notifier votre application des changements de statut des transactions.
7. Testez la connexion avec `Activesession_GetCurrent_V2`.
8. Activez l'application pour votre entreprise QuickBooks Online.

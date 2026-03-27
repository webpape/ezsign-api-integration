# HubSpot Integration - eZsign

## Cas d'usage métiers
- **Ventes :** Envoyez des contrats de vente ou des devis directement depuis un Deal HubSpot.
- **Service Client :** Faites signer des accords de renouvellement de service liés à des Tickets.
- **Opérations :** Automatisez la signature de documents de conformité liés à des Entreprises ou des Contacts.

## Procédure d'installation
1. **Application Privée :** Dans HubSpot, allez dans `Paramètres > Intégrations > Applications privées`.
2. **Créer une App :** Cliquez sur "Créer une application privée". Nommez-la "eZsign HubSpot".
3. **Scopes :** Accordez les permissions `crm.objects.deals.read/write` et `crm.objects.contacts.read`.
4. **Configuration eZsign :** 
   - Utilisez votre `Access Token` HubSpot pour lier les webhooks.
   - Configurez l'authentification OAuth2 avec les URLs ci-dessous.
5. **Déploiement :** Importez les définitions de `generated-actions.json` pour ajouter des "Custom Actions" dans vos Workflows HubSpot.

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `ezsignfolder.completed` -> Mettre à jour la propriété "Deal Stage" dans HubSpot vers "Contrat Signé".
- `ezsigndocument.completed` -> Télécharger le PDF signé et l'ajouter à la chronologie (Timeline) du Deal.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérification de la session active entre HubSpot et eZsign.

### 2. Ezsignfolder_CreateObject_V3
- **POST** `/3/object/ezsignfolder`
- **Summary :** Créer un dossier eZsign à partir d'un Deal ID HubSpot.

### 3. Ezsigndocument_CreateObject_V3
- **POST** `/3/object/ezsigndocument`
- **Summary :** Ajouter des documents (fichiers joints du Deal) au processus de signature.

### 4. Ezsignfoldersignerassociation_CreateObject_V2
- **POST** `/2/object/ezsignfoldersignerassociation`
- **Summary :** Associer les contacts liés au Deal comme signataires.

### 5. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Obtenir le lien du document signé pour l'archivage HubSpot.

## Actions HubSpot
- **Workflow Action :** Déclenchement automatique de l'envoi eZsign lorsqu'un Deal atteint une certaine étape.
- **Timeline Events :** Inscription de chaque étape (Ouvert, Signé) dans le flux d'activité HubSpot.

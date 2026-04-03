# Microsoft Teams Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL :** `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`

## Cas d'usage métiers
- **Notifications de signature en temps réel** : Informer immédiatement les membres d'une équipe ou d'un canal lorsqu'un document est signé ou complété.
- **Approbation collaborative** : Lancer un processus de signature eZsign directement depuis une conversation Teams via un raccourci ou un bot.
- **Accès rapide aux documents** : Récupérer des liens de téléchargement sécurisés pour les documents signés sans quitter l'interface Teams.
- **Gestion de projet** : Suivre l'avancement des dossiers eZsign liés à des projets gérés dans Teams.

## Webhooks
Logic synchronisée avec eZsign Power Automate :
- `document.signed` -> Envoi automatique d'Adaptive Cards dans les canaux Teams pour notifier les parties prenantes.
- `document.completed` -> Message final avec lien de téléchargement sécurisé posté dans le canal approprié.
- `folder.completed` -> Notification de clôture du dossier pour archivage ou étape suivante du projet.

## Endpoints (Specs issues d'eZmax API Definition)

### 1. Activesession_GetCurrent_V2
- **GET** `/2/object/activesession/getCurrent`
- **Summary :** Vérifier les permissions et l'état de la session de l'application Teams intégrée.

### 2. Ezsigndocument_CreateObject_V2
- **POST** `/2/object/ezsigndocument`
- **Summary :** Créer un nouveau document eZsign à partir d'une action interactive dans Teams.

### 3. Ezsigndocument_GetDownloadUrl_V1
- **GET** `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}`
- **Summary :** Générer un lien de téléchargement temporaire pour un document signé à afficher dans Teams.

### 4. Ezsignfoldertype_GetAutocomplete_V2
- **GET** `/2/object/ezsignfoldertype/getAutocomplete/{sSelector}`
- **Summary :** Rechercher les types de dossiers disponibles pour peupler les formulaires Teams.

### 5. Ezsigntemplateglobal_GetAutocomplete_V2
- **GET** `/2/object/ezsigntemplateglobal/getAutocomplete/{sSelector}`
- **Summary :** Lister les modèles globaux eZmax pour une sélection rapide lors de la création de documents.

### 6. Ezsignfolder_Send_V3
- **POST** `/3/object/ezsignfolder/{pkiEzsignfolderID}/send`
- **Summary :** Envoyer le dossier pour signature une fois préparé via l'interface Teams.

## Actions Microsoft Teams
- **Adaptive Cards** : Utiliser les webhooks pour envoyer des cartes riches et interactives permettant aux utilisateurs de voir le statut d'un document.
- **Bots de conversation** : Interroger le bot pour obtenir l'état d'avancement d'un dossier via `Ezsigndocument_GetDownloadUrl_V1`.
- **Raccourcis de message** : Créer un dossier eZsign à partir d'un message existant dans Teams en utilisant `Ezsigndocument_CreateObject_V2`.

## Procédure pour créer un connecteur Microsoft Teams
1. Connectez-vous au **Portail Développeur Microsoft Teams** (Teams Developer Portal).
2. Créez une nouvelle application ou ouvrez une application existante.
3. Allez dans l'onglet **App features** et activez les fonctionnalités nécessaires (Bot, Messaging Extension).
4. Pour l'API eZsign :
    - Allez dans **API Connectors**.
    - Ajoutez un nouveau connecteur en utilisant les spécifications fournies dans `generated-actions.json`.
    - Configurez l'authentification OAuth2 avec les URLs fournies dans la section "Authentification" ci-dessus.
5. Configurez les **Outgoing Webhooks** ou utilisez **Power Automate** pour Teams afin de recevoir les notifications eZsign.
6. Testez la connectivité en utilisant l'action `Activesession_GetCurrent_V2`.
7. Publiez l'application dans votre catalogue d'organisation Teams.

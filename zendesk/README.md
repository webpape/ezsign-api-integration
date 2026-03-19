# Zendesk Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Zendesk Support App)
- **Scopes :** `read`, `write`
- **Logic eZsign :** Synchronisation des tickets Zendesk avec les signatures eZsign.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Mettre à jour le champ personnalisé "Statut de Signature" du ticket Zendesk.
  - `document.completed` -> Résoudre le ticket Zendesk automatiquement.

## Actions
1. **Send Link for Signing :** Envoyer le lien eZsign via un commentaire public dans Zendesk.
2. **Attach Final PDF :** Ajouter le document signé en pièce jointe au ticket Zendesk.

# Zendesk Connector Installation Instructions

## 1. Create a Zendesk App
1. Go to **Zendesk Admin Center** > **Apps and integrations** > **Zendesk Support apps**.
2. Register a new app named **eZsign Integration**.

## 2. Configure OAuth2
1. Redirect URI: `https://your-server.com/zendesk/auth`.
2. Copy the **Client ID** and **Client Secret**.

## 3. Deployment
1. Configure the OAuth2 URLs:
   - Auth: `https://{subdomain}.zendesk.com/oauth/authorizations/new`
   - Token: `https://{subdomain}.zendesk.com/oauth/tokens`

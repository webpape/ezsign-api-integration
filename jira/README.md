# Jira Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Atlassian Connect / OAuth 2.0 (3LO))
- **Scopes :** `read:jira-work`, `write:jira-work`, `manage:jira-configuration`
- **Logic eZsign :** Transition de l'état d'un ticket Jira lors de la signature d'un document.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Transférer le ticket Jira vers l'état "Fermé" ou "Terminé".
  - `document.rejected` -> Ajouter un commentaire au ticket : "❌ Signature rejetée par le client."

## Actions
1. **Create Issue with Signature :** Créer un ticket Jira incluant une transaction eZsign.
2. **Attach Signed PDF :** Joindre le document final à la section "Attachments" du ticket.

# Jira Connector Installation Instructions

## 1. Create an Atlassian App
1. Go to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).
2. Create a new "OAuth 2.0 (3LO)" app named **eZsign Jira Integration**.

## 2. Configure Permissions
1. Add **Jira Platform REST API** permissions:
   - `read:jira-work`
   - `write:jira-work`

## 3. Deployment
1. Copy the **Client ID** and **Client Secret**.
2. Configure the OAuth2 URLs:
   - Auth: `https://auth.atlassian.com/authorize`
   - Token: `https://auth.atlassian.com/oauth/token`

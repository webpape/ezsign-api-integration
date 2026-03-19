# Asana Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Asana App)
- **Scopes :** `default`
- **Logic eZsign :** Gestion du cycle de vie des tâches Asana en fonction des documents signés.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Marquer la tâche Asana comme "Terminée".
  - `document.completed` -> Ajouter un commentaire : "🏁 Le document a été signé et archivé."

## Actions
1. **Create Task with Signature :** Créer une tâche Asana contenant la demande de signature eZsign.
2. **Attach File :** Joindre le document PDF final à la tâche Asana correspondante.

# Asana Connector Installation Instructions

## 1. Create a Developer App
1. Go to [app.asana.com/0/developer-console](https://app.asana.com/0/developer-console).
2. Create a new app named **eZsign Integration**.

## 2. Configure OAuth2
1. Redirect URI: `https://your-server.com/asana/auth`.
2. Scopes: `default`.

## 3. Deployment
1. Copy the **Client ID** and **Client Secret**.
2. Configure the OAuth2 URLs:
   - Auth: `https://app.asana.com/-/oauth_authorize`
   - Token: `https://app.asana.com/-/oauth_token`

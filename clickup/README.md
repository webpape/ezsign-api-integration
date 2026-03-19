# ClickUp Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (ClickUp App)
- **Scopes :** `all`
- **Logic eZsign :** Gestion automatique des tâches ClickUp à partir des signatures.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Mettre à jour le statut de la tâche ClickUp à "Prêt pour Archivage".
  - `document.completed` -> Marquer la tâche comme "Complétée".

## Actions
1. **Create Task with Signature :** Créer une tâche ClickUp contenant les détails eZsign.
2. **Attach Signed Copy to Task :** Joindre le document PDF signé à la tâche ClickUp via l'API `/task/{task_id}/attachment`.

# ClickUp Connector Installation Instructions

## 1. Create a ClickUp App
1. Go to your **ClickUp Settings** > **Apps**.
2. Create a new app named **eZsign ClickUp Integration**.

## 2. Configure OAuth2
1. Redirect URI: `https://your-server.com/clickup/auth`.
2. Copy the **Client ID** and **Client Secret**.

## 3. Deployment
1. Configure the OAuth2 URLs:
   - Auth: `https://app.clickup.com/api`
   - Token: `https://app.clickup.com/api/v2/oauth/token`

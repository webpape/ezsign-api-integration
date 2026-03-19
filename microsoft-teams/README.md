# Microsoft Teams Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Microsoft Graph API)
- **Scopes :** `Chat.ReadWrite`, `TeamsActivity.Send`, `ChannelMessage.Send`
- **Logic eZsign :** Notifications de signature dans les canaux Teams via Adaptive Cards.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Envoyer une Adaptive Card Teams : "📄 Document Signé : [Nom]."
  - `document.completed` -> Message : "🏁 La transaction [Nom] est maintenant complétée."

## Actions
1. **Post to Channel :** Publier une mise à jour sur une signature en cours.
2. **Send Direct Message :** Envoyer un lien de signature eZsign directement à un employé via Teams.

# Microsoft Teams Connector Installation Instructions

## 1. Register an App in Azure AD
1. Go to the [Azure Portal](https://portal.azure.com/) > **Azure Active Directory** > **App registrations**.
2. Create a new registration named **eZsign Teams Integration**.

## 2. Configure Permissions
1. Under **API permissions**, add **Microsoft Graph**:
   - `ChannelMessage.Send`
   - `TeamsActivity.Send`

## 3. Deployment
1. Copy the **Application (client) ID** and **Directory (tenant) ID**.
2. Generate a **Client secret**.
3. Configure the OAuth2 URLs:
   - Auth: `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize`
   - Token: `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`

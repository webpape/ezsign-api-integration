# eZsign - Zapier Connector Documentation

## Authentification
- **Méthode :** OAuth2
- **Authorization URL :** `https://api.ezsign.ca/oauth/authorize`
- **Token URL :** `https://api.ezsign.ca/oauth/token`

## Webhooks
- Configuration de l'abonnement via Zapier Webhook Trigger.
- Évènements gérés : `document.signed`, `document.rejected`, `document.completed`.

## Actions
1. **Create Document :** Initier une demande de signature.
2. **Send for Review :** Envoyer le document pour vérification.
3. **Download Signed Copy :** Récupérer le document PDF signé.

# Slack Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Slack App)
- **Scopes :** `chat:write`, `incoming-webhook`, `channels:read`
- **Logic eZsign :** Notifications en temps réel dans un canal spécifique lors des changements d'état des documents.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Envoyer un message Slack : "✅ Le document [Nom] a été signé par [Signataire]."
  - `document.rejected` -> Envoyer un message Slack : "❌ Le document [Nom] a été rejeté par [Signataire]."

## Actions
1. **Send Notification :** Envoyer manuellement un rappel de signature vers un utilisateur Slack.
2. **List Recent Transactions :** Afficher les 5 dernières transactions eZsign directement dans Slack via une commande slash `/ezsign-status`.

# Slack Connector Installation Instructions

## 1. Create a Slack App
1. Go to [api.slack.com/apps](https://api.slack.com/apps).
2. Create an app "From scratch" named **eZsign Notifier**.

## 2. Configure OAuth & Permissions
1. Add `chat:write` and `incoming-webhook`.
2. Install the app to your workspace.

## 3. Setup Webhook
1. Copy the **Webhook URL** provided by Slack.
2. Configure this URL in your eZsign Webhook settings for the desired events.

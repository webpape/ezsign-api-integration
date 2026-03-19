# Freshdesk Connector Integration - eZsign

## Authentification
- **Méthode :** API Key ou OAuth2
- **Logic eZsign :** Mettre à jour les tickets Freshdesk lors d'une signature.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Ajouter une note interne au ticket Freshdesk.
  - `document.rejected` -> Changer le statut du ticket à "Urgent".

## Actions
1. **Create Note with Signature :** Ajouter une note au ticket avec le lien de signature eZsign.
2. **Attach Final PDF :** Une fois signé, le document est joint au ticket.

# Freshdesk Connector Installation Instructions

## 1. Get API Key
1. Go to your **Profile Settings** > **API Key**.

## 2. Configuration
1. Use the **eZsign transaction ID** to find the corresponding Freshdesk ticket.

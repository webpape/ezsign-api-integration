# Trello Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth1 (Trello App Key & Token)
- **Logic eZsign :** Déplacement automatique d'une carte Trello lorsqu'un document est signé.

## Webhooks
- S'abonner aux Webhooks eZsign :
  - `document.signed` -> Déplacer la carte Trello correspondante vers la liste "Signé".
  - `document.rejected` -> Déplacer la carte Trello vers la liste "À Revoir".

## Actions
1. **Create Signature Card :** Créer une nouvelle carte Trello contenant les détails de la demande de signature eZsign.
2. **Attach Signed Copy to Card :** Une fois signé, le document est joint à la carte Trello.

# Trello Connector Installation Instructions

## 1. Get Trello App Key
1. Visit [trello.com/app-key](https://trello.com/app-key).
2. Copy your **API Key** and **Secret**.

## 2. Generate a Token
1. Use the Trello OAuth2 authorize URL to get a user token with `read,write` permissions.

## 3. Configuration
1. Use the **eZsign document ID** as a custom field or in the card description to maintain the link between the signature and the card.

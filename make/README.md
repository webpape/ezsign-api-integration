# eZsign - Make (Integromat) Connector Documentation

## Authentification
- **Méthode :** OAuth2
- **Connection Type :** OAuth2
- **Authorize URI :** `https://api.ezsign.ca/oauth/authorize`
- **Token URI :** `https://api.ezsign.ca/oauth/token`

## Modules (Triggers/Actions/Searches)
1. **Watch Documents :** Webhook trigger pour le changement de statut (signed, rejected).
2. **Create a Document :** Créer une transaction eZsign.
3. **Get Document PDF :** Télécharger le document final.
4. **List Envelopes :** Rechercher des transactions par date ou statut.

## Webhooks
Configuration dynamique via l'API eZsign pour enregistrer le webhook de Make dès l'activation du module.

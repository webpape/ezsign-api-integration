# Salesforce Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (Salesforce Connected App)
- **Scopes :** `api`, `refresh_token`, `offline_access`
- **Logic eZsign :** Synchronisation de l'email du signataire avec le Lead Salesforce.

## Webhooks
- S'abonner aux Webhooks eZsign : Lorsqu'un document est signé, le statut du Lead Salesforce est mis à jour vers "Signed".
- Action Salesforce : Utilisation de l'objet `Attachment` pour stocker le PDF final.

## Actions
1. **Send Signature Request :** Déclenché depuis une fiche Lead ou Opportunity.
2. **Retrieve Signed Document :** Une fois signé, le document est joint automatiquement à l'onglet 'Files' du Lead.

# Salesforce Connector Installation Instructions

## 1. Create a Salesforce Connected App
1. Go to **Setup** > **App Manager** > **New Connected App**.
2. Name it **eZsign API Integration**.
3. Enable OAuth Settings and set the Callback URL.

## 2. Configure Scopes
Add the following scopes:
- `api`
- `refresh_token`
- `offline_access`

## 3. Deployment
1. Go to **Setup** > **Connected Apps** > **Manage Connected Apps**.
2. Set **IP Relaxation** to "Relax IP restrictions" (optional).
3. Set **Refresh Token Policy** to "Refresh token is valid until revoked".

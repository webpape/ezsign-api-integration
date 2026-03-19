# HubSpot Connector Integration - eZsign

## Authentification
- **Méthode :** OAuth2 (HubSpot App)
- **Scopes :** `crm.objects.contacts.read`, `crm.objects.deals.read`
- **Logic eZsign :** Synchronisation de l'email du signataire avec le contact HubSpot.

## Webhooks
- Synchronisation bidirectionnelle : Lorsqu'un document est signé dans eZsign, le statut du "Deal" HubSpot est mis à jour.
- Événement HubSpot : `deal.propertyChange` -> Action eZsign : `updateDocumentStatus`.

## Actions
1. **Send Signature Request :** Déclenché depuis une fiche Deal.
2. **Attach Signed PDF :** Une fois signé, le document est joint automatiquement à l'onglet 'Notes' du Deal.

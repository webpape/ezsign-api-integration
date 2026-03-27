# Integration Logic: eZsign for Freshdesk

Ce document définit l'interaction entre les tickets Freshdesk et eZsign.

## Mapping Freshdesk -> eZsign

| Freshdesk Object | eZsign API Field |
|------------------|------------------|
| Ticket ID        | sEzsignfolderDescription (Prefix) |
| Ticket Subject   | sEzsignfolderDescription |
| Requester Email  | sEmailAddress |
| Attachment Name  | sEzsigndocumentName |

## Triggers (Webhooks)
- **Ezsignfolder_Completed**: Déclenche une mise à jour via l'API Freshdesk pour ajouter une note : "Signature terminée pour le dossier [ID]".
- **Ezsigndocument_Completed**: Télécharge le document signé et le joint au ticket correspondant via `ticket_id`.

## Actions (API Mapping)
| Action Name | Method | Endpoint |
|-------------|--------|----------|
| Check Session | GET | `/2/object/activesession/getCurrent` |
| Create Folder | POST | `/3/object/ezsignfolder` |
| Create Document | POST | `/3/object/ezsigndocument` |
| Link Signer | POST | `/2/object/ezsignfoldersignerassociation` |
| Get Signed PDF Link | GET | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/Signed` |

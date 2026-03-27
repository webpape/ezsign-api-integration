# Integration Logic: eZsign for HubSpot

Ce document définit les liens entre HubSpot CRM et eZsign.

## Mapping HubSpot -> eZsign

| HubSpot Object | HubSpot Property | eZsign API Field | Action |
|----------------|------------------|------------------|--------|
| Deal           | Deal ID          | sEzsignfolderDescription (HS ID) | Create Folder |
| Deal           | Amount           | fEzsignfolderAmount (if applicable) | Create Folder |
| Contact        | Email            | sEmailAddress | Create Signer |
| Deal Attachment | Attachment URL   | sEzsigndocumentName | Create Document |

## Triggers (Webhooks)
- **Ezsignfolder_Completed**: Utilise l'API HubSpot `crm.objects.deals` pour mettre à jour la propriété `dealstage`.
- **Ezsigndocument_Completed**: Utilise l'API HubSpot `crm.files` pour importer le PDF signé et l'attacher au Deal correspondant via l'ID stocké.

## Actions (API Mapping)
| Action Name | Method | Endpoint |
|-------------|--------|----------|
| Check Session | GET | `/2/object/activesession/getCurrent` |
| Create Folder | POST | `/3/object/ezsignfolder` |
| Create Document | POST | `/3/object/ezsigndocument` |
| Associate Contact | POST | `/2/object/ezsignfoldersignerassociation` |
| Get Signed Link | GET | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/Signed` |

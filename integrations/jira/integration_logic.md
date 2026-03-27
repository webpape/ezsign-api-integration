# Integration Logic: eZsign for Jira

Ce document décrit le mapping pour l'intégration Jira.

## Mapping Jira -> eZsign

| Jira Object | Jira Field | eZsign API Field |
|-------------|------------|------------------|
| Issue       | Key        | sEzsignfolderDescription (Prefix) |
| Issue       | Summary    | sEzsignfolderDescription |
| Issue       | Reporter Email | sEmailAddress |
| Attachment  | Filename   | sEzsigndocumentName |

## Triggers (Webhooks)
- **Ezsignfolder_Completed**: Transitionne le ticket Jira via l'API REST Atlassian.
- **Ezsigndocument_Completed**: Télécharge le PDF signé et l'ajoute comme pièce jointe au ticket Jira via l'endpoint `/rest/api/3/issue/{issueIdOrKey}/attachments`.

## Actions (API Mapping)
| Action Name | Method | Endpoint |
|-------------|--------|----------|
| Check Session | GET | `/2/object/activesession/getCurrent` |
| Create Folder | POST | `/3/object/ezsignfolder` |
| Create Document | POST | `/3/object/ezsigndocument` |
| Link Contact | POST | `/2/object/ezsignfoldersignerassociation` |
| Download Signed PDF | GET | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/Signed` |

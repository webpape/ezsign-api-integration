# Integration Logic: eZsign for ClickUp

Ce document décrit le mapping pour l'intégration ClickUp.

## Mapping ClickUp -> eZsign

| ClickUp Object | eZsign API Field | Action |
|----------------|------------------|--------|
| Task Name      | sEzsignfolderDescription | Create Folder |
| Task Description | sEzsigndocumentName | Create Document |
| Assignee Email | sEmailAddress | Create Signer |
| Custom Field: "Client Email" | sEmailAddress | Create Signer (Alternative) |

## Triggers (Webhooks)
- **Ezsignfolder_Completed**: Déclenche l'automatisation pour déplacer la tâche ClickUp dans une liste "Signé".
- **Ezsigndocument_Completed**: Utilise l'API ClickUp pour uploader le fichier final dans les pièces jointes de la tâche.

## Actions (API Mapping)
| Action Name | Method | Endpoint |
|-------------|--------|----------|
| Check Session | GET | `/2/object/activesession/getCurrent` |
| Create Folder | POST | `/3/object/ezsignfolder` |
| Create Document | POST | `/3/object/ezsigndocument` |
| Add Signer | POST | `/2/object/ezsignfoldersignerassociation` |
| Get Signed PDF | GET | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/Signed` |

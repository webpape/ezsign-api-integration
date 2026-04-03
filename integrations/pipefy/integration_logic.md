# Integration Logic: eZsign for Pipefy

This document details the mapping between the eZsign API (PowerAutomate definition) and the Pipefy platform.

## Authentication
- **Mechanism**: OAuth2
- **Authorize URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`
- **Base API URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest`

## Triggers (Webhooks)
Implement these in Pipefy as **Phase Transitions** or **Field Updates**:
- **Ezsignfolder_Completed**: Triggers when an Ezsignfolder is completed. Move the Pipefy Card to the next phase (e.g., "Signed").
- **Ezsigndocument_Completed**: Triggers when an Ezsigndocument is completed. Update a "Files" field with the download link.
- **Ezsignfoldersignerassociation_Completed**: Triggers when a Signer has completed their signatures. Add a note or comment to the Pipefy Card.

## Actions (API Mapping)

| Pipefy Action | eZmax API Operation | Endpoint | Description |
|---------------|----------------------|----------|-------------|
| Verify Connection | `Activesession_GetCurrent_V2` | GET `/2/object/activesession/getCurrent` | Test the connectivity from Pipefy. |
| Create eZsign Document from Card | `Ezsigndocument_CreateObject_V2` | POST `/2/object/ezsigndocument` | Map Pipefy fields (Email, Card ID) to eZsign document fields. |
| Apply Template to Card Data | `Ezsigndocument_ApplyEzsigntemplate_V2` | POST `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate` | Apply a predefined template to a new document created from a Pipefy Card. |
| Retrieve Download URL for Card Attachment | `Ezsigndocument_GetDownloadUrl_V1` | GET `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}` | Get a link to the signed PDF for automatic attachment to the Pipefy Card. |
| Map Card Contact as Signer | `Ezsignfoldersignerassociation_CreateObject_V2` | POST `/2/object/ezsignfoldersignerassociation` | Associate a contact (Signer) with a folder based on Pipefy form data. |
| Search Template List for Phase Automation | `Ezsigntemplate_GetAutocomplete_V2` | GET `/2/object/ezsigntemplate/getAutocomplete/{sSelector}` | List templates for selection in a Pipefy automation or recipe. |
| Send Folder for Signature | `Ezsignfolder_Send_V3` | POST `/3/object/ezsignfolder/{pkiEzsignfolderID}/send` | Send the folder prepared via Pipefy for signature. |

## Data Mapping Examples
- **Pipefy Card ID** -> Stored as reference in eZsign document notes.
- **Pipefy Form Field (Email)** -> eZsign Signer Email.
- **Pipefy Phase Status** -> Updated by eZsign webhooks (e.g., "Approved", "Contract Signed").
- **Pipefy Organization ID** -> Used to identify the correct eZsign account/API key.

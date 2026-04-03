# Integration Logic: eZsign for Monday.com

This document details the mapping between the eZsign API (PowerAutomate definition) and the Monday.com platform.

## Authentication
- **Mechanism**: OAuth2
- **Authorize URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`
- **Base API URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest`

## Triggers (Webhooks)
Implement these in Monday.com as **Status Updates** or **Notifications**:
- **Ezsignfolder_Completed**: Triggers when an Ezsignfolder is completed. Update the Monday Item status to "Signed".
- **Ezsigndocument_Completed**: Triggers when an Ezsigndocument is completed. Update a "Files" column with the download link.
- **Ezsignfoldersignerassociation_Completed**: Triggers when a Signer has completed their signatures. Add a timeline entry in the Monday board.

## Actions (API Mapping)

| Monday.com Action | eZmax API Operation | Endpoint | Description |
|-------------------|----------------------|----------|-------------|
| Check Connectivity | `Activesession_GetCurrent_V2` | GET `/2/object/activesession/getCurrent` | Test the OAuth2 connection from Monday. |
| Create eZsign Document from Item | `Ezsigndocument_CreateObject_V2` | POST `/2/object/ezsigndocument` | Map Monday columns (Email, Name) to eZsign document fields. |
| Apply Template to Document | `Ezsigndocument_ApplyEzsigntemplate_V2` | POST `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate` | Apply a predefined template to a new document created from a Monday board. |
| Retrieve Download URL | `Ezsigndocument_GetDownloadUrl_V1` | GET `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}` | Get a link to the signed PDF to store in a Monday "Link" column. |
| Map Contact as Signer | `Ezsignfoldersignerassociation_CreateObject_V2` | POST `/2/object/ezsignfoldersignerassociation` | Associate a contact (Signer) with a folder based on Monday people column. |
| Search Template List | `Ezsigntemplate_GetAutocomplete_V2` | GET `/2/object/ezsigntemplate/getAutocomplete/{sSelector}` | List templates for selection in a Monday recipe. |
| Finalize and Send Folder | `Ezsignfolder_Send_V3` | POST `/3/object/ezsignfolder/{pkiEzsignfolderID}/send` | Send the folder out for signatures after it's prepared from Monday data. |

## Data Mapping Examples
- **Monday Item Name** -> eZsign Folder Name
- **Monday People Column (Email)** -> eZsign Signer Email
- **Monday Status Column** -> Updated by eZsign webhooks (e.g., "In Progress", "Signed").
- **Monday Date Column** -> Set as eZsign Document due date.

# Integration Logic: eZsign for QuickBooks Online

This document details the mapping between the eZsign API (PowerAutomate definition) and the QuickBooks Online platform.

## Authentication
- **Mechanism**: OAuth2
- **Authorize URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`
- **Base API URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest`

## Triggers (Webhooks)
Implement these in QuickBooks Online as **Transaction Updates** or **Attachment Uploads**:
- **Ezsignfolder_Completed**: Triggers when an Ezsignfolder is completed. Update the QuickBooks Quote/Estimate status to "Accepted".
- **Ezsigndocument_Completed**: Triggers when an Ezsigndocument is completed. Upload the signed PDF as an attachment to the QuickBooks Invoice/Estimate.
- **Ezsignfoldersignerassociation_Completed**: Triggers when a Signer has completed their signatures. Record the event in a custom field or QuickBooks Customer note.

## Actions (API Mapping)

| QuickBooks Action | eZmax API Operation | Endpoint | Description |
|-------------------|----------------------|----------|-------------|
| Check API Link | `Activesession_GetCurrent_V2` | GET `/2/object/activesession/getCurrent` | Test the connectivity from QuickBooks. |
| Create eZsign Document from Invoice | `Ezsigndocument_CreateObject_V2` | POST `/2/object/ezsigndocument` | Map QuickBooks fields (Customer Email, Invoice ID) to eZsign document fields. |
| Apply Template to Invoice | `Ezsigndocument_ApplyEzsigntemplate_V2` | POST `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate` | Apply a predefined template (Terms & Conditions) to the document generated from an invoice. |
| Retrieve Download URL for Attachment | `Ezsigndocument_GetDownloadUrl_V1` | GET `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}` | Get a link to the signed PDF for automatic storage in the QuickBooks transaction record. |
| Map Customer as Signer | `Ezsignfoldersignerassociation_CreateObject_V2` | POST `/2/object/ezsignfoldersignerassociation` | Associate a QuickBooks Customer with a folder for signature. |
| Search Template List for Billing | `Ezsigntemplate_GetAutocomplete_V2` | GET `/2/object/ezsigntemplate/getAutocomplete/{sSelector}` | List templates for selection in a QuickBooks automation recipe. |
| Finalize and Send Folder | `Ezsignfolder_Send_V3` | POST `/3/object/ezsignfolder/{pkiEzsignfolderID}/send` | Send the folder prepared via QuickBooks for signature. |

## Data Mapping Examples
- **QuickBooks Invoice ID** -> Stored as reference in eZsign document notes.
- **QuickBooks Customer Email** -> eZsign Signer Email.
- **QuickBooks Transaction Status** -> Updated by eZsign webhooks (e.g., "Estimate Signed").
- **QuickBooks Sales Representative** -> Used to determine the document owner in eZsign.

# Integration Logic: eZsign for NetSuite

This document details the mapping between the eZsign API (PowerAutomate definition) and the NetSuite platform.

## Authentication
- **Mechanism**: OAuth2 (Token-Based Authentication / OAuth 2.0)
- **Authorize URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`
- **Base API URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest`

## Triggers (Webhooks)
Implement these in NetSuite as **RESTlets** or **User Event Scripts**:
- **Ezsignfolder_Completed**: Triggers when an Ezsignfolder is completed. Use a RESTlet to update the NetSuite Transaction/Entity status.
- **Ezsigndocument_Completed**: Triggers when an Ezsigndocument is completed. Update a Custom Field with the download link or notify the NetSuite owner.
- **Ezsignfoldersignerassociation_Completed**: Triggers when a Signer has completed their signatures. Record the event in the NetSuite History/Communications tab.

## Actions (API Mapping)

| NetSuite Action | eZmax API Operation | Endpoint | Description |
|-----------------|----------------------|----------|-------------|
| Check NetSuite/eZsign Link | `Activesession_GetCurrent_V2` | GET `/2/object/activesession/getCurrent` | Test the connectivity from SuiteScript. |
| Generate Document from Record | `Ezsigndocument_CreateObject_V2` | POST `/2/object/ezsigndocument` | Map NetSuite fields (Customer Name, Email) to eZsign document fields. |
| Apply Template to Transaction | `Ezsigndocument_ApplyEzsigntemplate_V2` | POST `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate` | Apply a predefined template to the document generated from a NetSuite record. |
| Retrieve Download URL for File Cabinet | `Ezsigndocument_GetDownloadUrl_V1` | GET `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}` | Get a link to the signed PDF for automatic storage in NetSuite File Cabinet. |
| Map NetSuite Entity as Signer | `Ezsignfoldersignerassociation_CreateObject_V2` | POST `/2/object/ezsignfoldersignerassociation` | Associate a NetSuite Customer, Vendor, or Employee with a folder. |
| Search Template List for SuiteScript | `Ezsigntemplate_GetAutocomplete_V2` | GET `/2/object/ezsigntemplate/getAutocomplete/{sSelector}` | List templates for use in dynamic scripts or custom buttons. |
| Send Folder for Signature | `Ezsignfolder_Send_V3` | POST `/3/object/ezsignfolder/{pkiEzsignfolderID}/send` | Send the folder prepared via NetSuite for signature. |

## Data Mapping Examples
- **NetSuite Record ID (Internal ID)** -> Stored as reference in eZsign document notes.
- **NetSuite Entity (Email)** -> eZsign Signer Email.
- **NetSuite Transaction Status** -> Updated by eZsign webhooks (e.g., "Contract Signed").
- **NetSuite Department/Class** -> Used to determine which eZsign template to apply.

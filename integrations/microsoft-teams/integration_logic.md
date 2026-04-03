# Integration Logic: eZsign for Microsoft Teams

This document details the mapping between the eZsign API (PowerAutomate definition) and the Microsoft Teams platform.

## Authentication
- **Mechanism**: OAuth2
- **Authorize URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`
- **Base API URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest`

## Triggers (Webhooks)
Implement these in Microsoft Teams as **Adaptive Cards** or **Activity Feed** notifications:
- **Ezsignfolder_Completed**: Triggers when an Ezsignfolder is completed. Post a summary to the team channel.
- **Ezsigndocument_Completed**: Triggers when an Ezsigndocument is completed. Provide a download link via Adaptive Card.
- **Ezsignfoldersignerassociation_Completed**: Triggers when a Signer has completed their signatures. Notify the document owner in Teams.

## Actions (API Mapping)

| Microsoft Teams Action | eZmax API Operation | Endpoint | Description |
|-------------------------|---------------------|----------|-------------|
| Verify Session | `Activesession_GetCurrent_V2` | GET `/2/object/activesession/getCurrent` | Retrieve active session details for bot/app. |
| Create eZsign Document | `Ezsigndocument_CreateObject_V2` | POST `/2/object/ezsigndocument` | Trigger document creation from a Teams Message Shortcut. |
| Get Document Download Link | `Ezsigndocument_GetDownloadUrl_V1` | GET `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}` | Provide a temporary download link in a conversation. |
| List Folder Types | `Ezsignfoldertype_GetAutocomplete_V2` | GET `/2/object/ezsignfoldertype/getAutocomplete/{sSelector}` | Fill dropdowns in Teams Task Modules. |
| List Global Templates | `Ezsigntemplateglobal_GetAutocomplete_V2` | GET `/2/object/ezsigntemplateglobal/getAutocomplete/{sSelector}` | Select a global template from a Teams dialog. |
| Send Folder for Signature | `Ezsignfolder_Send_V3` | POST `/3/object/ezsignfolder/{pkiEzsignfolderID}/send` | Send the folder prepared via Teams for signature. |

## Data Mapping Examples
- **Teams Team/Channel ID** -> Could be mapped to a custom field in eZsign for tracking.
- **Microsoft Teams Message ID** -> Stored as reference in eZsign document notes.
- **eZsign Document Status** -> Used to update the status of an Adaptive Card in the Teams conversation.

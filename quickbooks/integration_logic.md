# Integration Logic: eZsign for Generic Platforms

This document details the mapping between the eZsign API (PowerAutomate definition) and generic integration platforms.

## Authentication
- **Mechanism**: OAuth2
- **Authorize URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize`
- **Token URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token`
- **Base API URL**: `https://prod.api.appcluster01.ca-central-1.ezmax.com/rest`

## Triggers (Webhooks)
Implement these as Webhook listeners in the target platform:
- **Ezsignfolder_Completed**: Triggers when an Ezsignfolder is completed.
- **Ezsigndocument_Completed**: Triggers when an Ezsigndocument is completed.
- **Ezsignfoldersignerassociation_Completed**: Triggers when a Signer has completed their signatures.

## Actions (API Mapping)

| Action Name | Method | Endpoint | Description |
|-------------|--------|----------|-------------|
| Get Current Activesession | GET | `/2/object/activesession/getCurrent` | Retrieve active session details. |
| Retrieve Communication Body | GET | `/1/object/communication/{pkiCommunicationID}/getCommunicationBody` | Get body of a communication. |
| Apply Global Template | POST | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplateglobal` | Apply predefined global template. |
| Apply Template | POST | `/2/object/ezsigndocument/{pkiEzsigndocumentID}/applyEzsigntemplate` | Apply predefined template. |
| Create Elements by Word | POST | `/2/object/ezsigndocument/{pkiEzsigndocumentID}/createEzsignelementsPositionedByWord` | Create signatures/form fields by word anchor. |
| Create Document (V3) | POST | `/3/object/ezsigndocument` | Create one or many documents. |
| Get Download URL | GET | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}` | Get temporary download link. |
| Prefill Form | POST | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/prefillEzsignform` | Prefill form fields. |
| Create Folder (V3) | POST | `/3/object/ezsignfolder` | Create one or many folders. |
| Dispose Folder | POST | `/1/object/ezsignfolder/{pkiEzsignfolderID}/dispose` | Dispose of a folder. |
| Get Folder Documents | GET | `/2/object/ezsignfolder/{pkiEzsignfolderID}/getEzsigndocuments` | List documents in folder. |
| Reorder Documents | POST | `/2/object/ezsignfolder/{pkiEzsignfolderID}/reorder` | Change document order. |
| Send Folder | POST | `/3/object/ezsignfolder/{pkiEzsignfolderID}/send` | Send folder for signature. |
| Create Signer Association | POST | `/2/object/ezsignfoldersignerassociation` | Associate a signer with a folder. |
| Autocomplete Foldertype | GET | `/2/object/ezsignfoldertype/getAutocomplete/{sSelector}` | Search foldertypes. |
| Autocomplete Template | GET | `/2/object/ezsigntemplate/getAutocomplete/{sSelector}` | Search templates. |
| Autocomplete TemplateGlobal | GET | `/2/object/ezsigntemplateglobal/getAutocomplete/{sSelector}` | Search global templates. |
| Autocomplete TemplatePackage | GET | `/2/object/ezsigntemplatepackage/getAutocomplete/{sSelector}` | Search template packages. |
| Autocomplete TSA Requirement | GET | `/2/object/ezsigntsarequirement/getAutocomplete/{sSelector}` | Search TSA requirements. |
| Autocomplete Language | GET | `/2/object/language/getAutocomplete/{sSelector}` | Search languages. |
| Autocomplete Secret Question | GET | `/2/object/secretquestion/getAutocomplete/{sSelector}` | Search secret questions. |
| Autocomplete Tax Assignment | GET | `/2/object/taxassignment/getAutocomplete/{sSelector}` | Search tax assignments. |
| Autocomplete User | GET | `/2/object/user/getAutocomplete/{sSelector}` | Search users. |
| Autocomplete Userlogintype | GET | `/2/object/userlogintype/getAutocomplete/{sSelector}` | Search user login types. |

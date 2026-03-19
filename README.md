# eZsign API Integration

Ce dépôt contient des modules d'intégration structurés pour diverses plateformes, basés sur la logique de l'API eZsign.

## Capacités du Connecteur (Source: Swagger eZsign Power Automate)

Toutes les intégrations listées dans ce dépôt sont conçues pour supporter l'ensemble des Triggers et Actions exposés par l'API eZsign.

### Actions (Operations)

- **Activesession_GetCurrent_V1** : Retrieve the details about the current activesession (Deprecated)
- **Activesession_GetCurrent_V2** : Get Current Activesession
- **Communication_GetCommunicationBody_V1** : Retrieve the communication body
- **Ezsigndocument_ApplyEzsigntemplateglobal_V1** : Apply an Ezsigntemplateglobal to the Ezsigndocument
- **Ezsigndocument_ApplyEzsigntemplate_V2** : Apply an Ezsigntemplate to the Ezsigndocument
- **Ezsigndocument_CreateEzsignelementsPositionedByWord_V1** : Create multiple Ezsignsignatures/Ezsignformfieldgroups (Deprecated)
- **Ezsigndocument_CreateEzsignelementsPositionedByWord_V2** : Create multiple Ezsignsignatures/Ezsignformfieldgroups
- **Ezsigndocument_CreateObject_V2** : Create a new Ezsigndocument (Deprecated)
- **Ezsigndocument_CreateObject_V3** : Create a new Ezsigndocument
- **Ezsigndocument_GetDownloadUrl_V1** : Retrieve a URL to download documents
- **Ezsigndocument_PrefillEzsignform_V1** : Prefill an Ezsignform
- **Ezsignfolder_CreateObject_V2** : Create a new Ezsignfolder (Deprecated)
- **Ezsignfolder_CreateObject_V3** : Create a new Ezsignfolder
- **Ezsignfolder_Dispose_V1** : Dispose the Ezsignfolder
- **Ezsignfolder_GetEzsigndocuments_V1** : Retrieve an existing Ezsignfolder's Ezsigndocuments (Deprecated)
- **Ezsignfolder_GetEzsigndocuments_V2** : Retrieve an existing Ezsignfolder's Ezsigndocuments
- **Ezsignfolder_Reorder_V2** : Reorder Ezsigndocuments in the Ezsignfolder
- **Ezsignfolder_Send_V3** : Send the Ezsignfolder
- **Ezsignfoldersignerassociation_CreateObject_V2** : Create a new Ezsignfoldersignerassociation
- **Ezsignfoldertype_GetAutocomplete_V2** : Retrieve Ezsignfoldertypes and IDs
- **Ezsigntemplate_GetAutocomplete_V2** : Retrieve Ezsigntemplates and IDs
- **Ezsigntemplateglobal_GetAutocomplete_V2** : Retrieve Ezsigntemplateglobals and IDs
- **Ezsigntemplatepackage_GetAutocomplete_V2** : Retrieve Ezsigntemplatepackages and IDs
- **Ezsigntsarequirement_GetAutocomplete_V2** : Retrieve Ezsigntsarequirements and IDs
- **Language_GetAutocomplete_V2** : Retrieve Languages and IDs
- **Secretquestion_GetAutocomplete_V2** : Retrieve Secretquestions and IDs
- **Taxassignment_GetAutocomplete_V2** : Retrieve Taxassignments and IDs
- **User_GetAutocomplete_V2** : Retrieve Users and IDs
- **Userlogintype_GetAutocomplete_V2** : Retrieve Userlogintypes and IDs

### Triggers (Webhooks)

*Basé sur la logique eZsign Webhook:*
- **Ezsignfolder_Completed** : Triggered when an Ezsignfolder is completed.
- **Ezsigndocument_Completed** : Triggered when an Ezsigndocument is completed.
- **Ezsignfoldersignerassociation_Completed** : Triggered when a Signer has completed their signatures.

## Architecture

Chaque dossier contient les fichiers de configuration (JSON/OpenAPI) et la documentation technique pour une plateforme spécifique :

- `/asana`
- `/clickup`
- `/freshdesk`
- `/hubspot`
- `/jira`
- `/make`
- `/microsoft-teams`
- `/monday`
- `/netsuite`
- `/pipefy`
- `/quickbooks`
- `/salesforce/`
- `/slack`
- `/trello`
- `/zapier`
- `/zendesk`

## Stratégie d'Intégration
Basé sur la logique eZsign : Authentification OAuth2, gestion des Webhooks, et cycle de vie des documents.

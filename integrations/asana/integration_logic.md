# Integration Logic: eZsign for Asana

Ce document détaille le mapping entre les données Asana et l'API eZsign.

## Authentification
- **Méthode**: OAuth2
- **Détails**: Voir README.md pour les URLs.

## Mapping de Données (Asana -> eZsign)

| Asana Field | eZsign API Field | Action |
|-------------|------------------|--------|
| Task Name   | sEzsignfolderDescription | Create Folder |
| Task Notes  | sEzsigndocumentName | Create Document |
| Assignee Email | sEmailAddress | Create Signer |
| Custom Field: "Folder ID" | pkiEzsignfolderID | Get Folder Status |

## Triggers (Webhooks)
- **Ezsignfolder_Completed**: Déclenche la mise à jour de la tâche Asana vers la section "Signé".
- **Ezsigndocument_Completed**: Télécharge le document signé et l'attache en pièce jointe à la tâche Asana originale via l'ID stocké.

## Actions (API Mapping)

| Action Name | Method | Endpoint | Description |
|-------------|--------|----------|-------------|
| Get Current Activesession | GET | `/2/object/activesession/getCurrent` | Vérification de la session. |
| Create Folder (V3) | POST | `/3/object/ezsignfolder` | Initialise un nouveau dossier depuis une tâche. |
| Create Document (V3) | POST | `/3/object/ezsigndocument` | Ajoute un fichier attaché d'Asana au dossier. |
| Create Signer Association | POST | `/2/object/ezsignfoldersignerassociation` | Lie un collaborateur Asana comme signataire. |
| Get Download URL | GET | `/1/object/ezsigndocument/{pkiEzsigndocumentID}/getDownloadUrl/{eDocumentType}` | Prépare l'import vers Asana. |

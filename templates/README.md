# {{PLATFORM_NAME}} Integration

This folder contains the necessary files to integrate **eZmax** with **{{PLATFORM_NAME}}**.

## Files
- `swagger.json`: The latest eZmax API definition (automatically synced).
- `definition.json` or `blueprint.json`: Platform-specific configuration file.

## Procedure to create a {{PLATFORM_NAME}} Connector

1. **Prerequisites**:
   - An active {{PLATFORM_NAME}} account with administrative privileges.
   - An eZmax API Key.
   - Access to this repository.

2. **Step-by-Step Setup**:
   - Log in to your {{PLATFORM_NAME}} developer portal.
   - Create a new application/connector named "eZmax Integration".
   - Import the `swagger.json` file provided in this directory to define the API actions.
   - Configure Authentication (OAuth2 or API Key as required by eZmax).
   - Test the connection using a simple "Get User" or similar endpoint.

3. **Updating the Integration**:
   - When the eZmax API changes, run `yarn sync` at the root of this project.
   - Re-import the updated `swagger.json` into {{PLATFORM_NAME}}.

## CLI Tools (if applicable)
Run `yarn install` at the root to have access to:
- `{{CLI_TOOL_COMMAND}}` (e.g., `zapier`, `sf`, etc.)


## Procédure pour créer un connecteur Templates
1. Accédez au portail développeur de Templates.
2. Créez une nouvelle intégration / application.
3. Importez le fichier `swagger.json` de ce dossier pour définir les points de terminaison.
4. Configurez l'authentification (OAuth2 ou Clé API) en utilisant les paramètres eZmax.
5. Testez la connexion avec l'endpoint `/2/object/activesession/getCurrent`.

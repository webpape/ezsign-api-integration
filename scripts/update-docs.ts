import fs from 'fs-extra';
import path from 'path';
import { INTEGRATIONS_DIR, EXCLUDED_DIRS } from '../src/constants.js';

const PROCEDURES: Record<string, string> = {
  zapier: `
## Procédure pour créer un connecteur Zapier
1. Installez le CLI Zapier : \`yarn zapier-platform-cli\`
2. Connectez-vous : \`yarn zapier login\`
3. Dans le dossier \`zapier/\`, initialisez si nécessaire puis poussez : \`yarn zapier push\`
4. Utilisez le fichier \`swagger.json\` pour importer les actions si vous utilisez l'UI Developer.
`,
  make: `
## Procédure pour créer un scénario Make
1. Créez un nouveau App dans le portail développeur de Make.
2. Importez le fichier \`swagger.json\` pour générer les modules.
3. Utilisez \`blueprint.json\` comme référence pour la structure des scénarios.
`,
  salesforce: `
## Procédure pour Salesforce
1. Utilisez le Salesforce CLI : \`yarn sf\`
2. Créez un "External Service" dans Salesforce en important le fichier \`swagger.json\`.
3. Configurez l'authentification via "Named Credentials".
`,
  hubspot: `
## Procédure pour HubSpot
1. Utilisez le CLI HubSpot : \`yarn hs\`
2. Créez une "Private App" ou une application publique.
3. Importez les définitions d'API si nécessaire pour les "Custom Objects".
`,
};

const GENERIC_PROCEDURE = (name: string) => `
## Procédure pour créer un connecteur ${name}
1. Accédez au portail développeur de ${name}.
2. Créez une nouvelle intégration / application.
3. Importez le fichier \`swagger.json\` de ce dossier pour définir les points de terminaison.
4. Configurez l'authentification (OAuth2 ou Clé API) en utilisant les paramètres eZmax.
5. Testez la connexion avec l'endpoint \`/2/object/activesession/getCurrent\`.
`;

async function updateDocs() {
  const entries = await fs.readdir(INTEGRATIONS_DIR, { withFileTypes: true });
  const integrationDirs = entries
    .filter(entry => entry.isDirectory() && !EXCLUDED_DIRS.includes(entry.name))
    .map(entry => entry.name);

  for (const dir of integrationDirs) {
    const readmePath = path.join(INTEGRATIONS_DIR, dir, 'README.md');
    let content = '';
    
    if (await fs.pathExists(readmePath)) {
      content = await fs.readFile(readmePath, 'utf-8');
    } else {
      content = `# Intégration ${dir.charAt(0).toUpperCase() + dir.slice(1)}\n`;
    }

    const procedure = PROCEDURES[dir] || GENERIC_PROCEDURE(dir.charAt(0).toUpperCase() + dir.slice(1));
    
    if (!content.includes('## Procédure')) {
      content += '\n' + procedure;
    }

    await fs.writeFile(readmePath, content);
    console.log(`Updated README: ${readmePath}`);
  }
}

updateDocs();

import fs from 'fs-extra';
import path from 'path';
import { SWAGGER_LOCAL_PATH } from '../../src/constants.js';

async function generateZapier() {
  const swaggerPath = path.resolve('../../', SWAGGER_LOCAL_PATH);
  const definitionPath = './definition.json';

  if (!await fs.pathExists(swaggerPath)) {
    console.error('Swagger file not found at', swaggerPath);
    return;
  }

  const swagger = await fs.readJson(swaggerPath);
  const definition = await fs.readJson(definitionPath);

  console.log(`[Zapier] Using Swagger version: ${swagger.info.version}`);

  // Example: Update definition version to match swagger version (or some logic)
  definition.version = swagger.info.version;

  // Example: Sync descriptions for actions listed in definition.json
  for (const action of definition.actions) {
    // In a real scenario, you'd find the path/method in swagger based on operationId
    // For now, we'll just log that we are syncing.
    console.log(`[Zapier] Syncing action: ${action.operationId}`);
  }

  await fs.writeJson(definitionPath, definition, { spaces: 2 });
  console.log('[Zapier] definition.json updated.');
}

generateZapier();

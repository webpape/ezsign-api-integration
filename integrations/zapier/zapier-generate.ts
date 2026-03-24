import fs from 'fs-extra';
import {
  loadArazzo,
  buildIntegrationActions,
  getStandardTriggers,
} from '../../src/arazzo-helpers.js';

async function generateZapier() {
  const arazzo = await loadArazzo();
  const actions = buildIntegrationActions(arazzo);
  const triggers = getStandardTriggers();

  console.log(`[Zapier] Using Arazzo version: ${arazzo.info.version}`);

  const definition = {
    version: arazzo.info.version,
    name: 'eZsign Connector',
    auth: {
      type: 'oauth2',
      params: {
        authorize_url:
          'https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/authorize',
        token_url:
          'https://prod.api.appcluster01.ca-central-1.ezmax.com/rest/oauth/token',
        scopes: ['repo', 'workflow', 'read:user'],
      },
    },
    triggers: triggers.map(t => ({
      key: t.key,
      label: t.label,
      description: t.description,
      type: 'hook',
      hook_url: '{{webhook_url}}',
      operationId: t.operationId,
    })),
    actions: actions.map(a => ({
      key: a.operationId.toLowerCase(),
      label: a.label,
      description: a.description,
      operationId: a.operationId,
    })),
  };

  const outputPath = new URL('./definition.json', import.meta.url).pathname;
  await fs.writeJson(outputPath, definition, { spaces: 2 });
  console.log(`[Zapier] definition.json updated with ${actions.length} actions, ${triggers.length} triggers.`);
}

generateZapier();

import fs from 'fs-extra';
import {
  loadArazzo,
  buildIntegrationActions,
  getStandardTriggers,
} from '../../src/arazzo-helpers.js';

async function generateMake() {
  const arazzo = await loadArazzo();
  const actions = buildIntegrationActions(arazzo);
  const triggers = getStandardTriggers();

  console.log(`[Make] Using Arazzo version: ${arazzo.info.version}`);

  const blueprint = {
    version: arazzo.info.version,
    name: 'eZsign',
    baseUrl: 'https://prod.api.appcluster01.ca-central-1.ezmax.com/rest',
    generatedAt: new Date().toISOString(),
    source: 'arazzo',
    modules: {
      triggers: triggers.map(t => ({
        name: t.key,
        label: t.label,
        description: t.description,
        type: 'webhook',
        operationId: t.operationId,
      })),
      actions: actions.map(a => ({
        name: a.operationId,
        label: a.label,
        description: a.description,
        operationId: a.operationId,
        workflowId: a.workflowId,
        hasParameters: a.hasParameters,
        hasRequestBody: a.hasRequestBody,
      })),
    },
  };

  const outputPath = new URL('./blueprint.json', import.meta.url).pathname;
  await fs.writeJson(outputPath, blueprint, { spaces: 2 });
  console.log(`[Make] blueprint.json updated with ${actions.length} actions, ${triggers.length} triggers.`);
}

generateMake();

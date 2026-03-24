import fs from 'fs-extra';
import { loadArazzo, buildPlatformOutput } from '../../src/arazzo-helpers.js';

async function generateHubspot() {
  const arazzo = await loadArazzo();
  const readmePath = new URL('./README.md', import.meta.url).pathname;
  const output = await buildPlatformOutput(arazzo, readmePath);

  console.log(`[HubSpot] Using Arazzo version: ${arazzo.info.version}`);
  console.log(`[HubSpot] Platform: ${output.platform}`);
  console.log(`[HubSpot] Filtered to ${output.actions.length} actions (from ${arazzo.workflows.reduce((s, w) => s + w.steps.length, 0)} total)`);

  const outputPath = new URL('./generated-actions.json', import.meta.url).pathname;
  await fs.writeJson(outputPath, output, { spaces: 2 });
  console.log(`[HubSpot] generated-actions.json created.`);
}

generateHubspot();

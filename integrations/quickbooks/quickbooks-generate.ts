import fs from 'fs-extra';
import { loadArazzo, buildPlatformOutput } from '../../src/arazzo-helpers.js';

async function generateQuickbooks() {
  const arazzo = await loadArazzo();
  const readmePath = new URL('./README.md', import.meta.url).pathname;
  const output = await buildPlatformOutput(arazzo, readmePath);

  console.log(`[QuickBooks] Using Arazzo version: ${arazzo.info.version}`);
  console.log(`[QuickBooks] Platform: ${output.platform}`);
  console.log(`[QuickBooks] Filtered to ${output.actions.length} actions (from ${arazzo.workflows.reduce((s, w) => s + w.steps.length, 0)} total)`);

  const outputPath = new URL('./generated-actions.json', import.meta.url).pathname;
  await fs.writeJson(outputPath, output, { spaces: 2 });
  console.log(`[QuickBooks] generated-actions.json created.`);
}

generateQuickbooks();

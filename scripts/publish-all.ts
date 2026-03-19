import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { INTEGRATIONS_DIR, EXCLUDED_DIRS } from '../src/constants.js';

async function publishAll() {
  const entries = await fs.readdir(INTEGRATIONS_DIR, { withFileTypes: true });
  const integrationDirs = entries
    .filter(entry => entry.isDirectory() && !EXCLUDED_DIRS.includes(entry.name))
    .map(entry => entry.name);

  console.log('--- Publishing All Integrations ---');

  for (const dir of integrationDirs) {
    const dirPath = path.join(INTEGRATIONS_DIR, dir);
    const publishScript = `${dir}-publish.ts`;
    const scriptPath = path.join(dirPath, publishScript);

    if (await fs.pathExists(scriptPath)) {
      console.log(`[${dir}] Running ${publishScript}...`);
      try {
        execSync(`tsx ${scriptPath}`, { stdio: 'inherit' });
      } catch (error) {
        console.error(`[${dir}] Failed to run publication script.`);
      }
    } else {
      console.log(`[${dir}] No publication script found (${publishScript}), skipping.`);
    }
  }

  console.log('--- Publication Complete ---');
}

publishAll();

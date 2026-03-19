import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { INTEGRATIONS_DIR, EXCLUDED_DIRS } from '../src/constants.js';

async function generateAll() {
  const entries = await fs.readdir(INTEGRATIONS_DIR, { withFileTypes: true });
  const integrationDirs = entries
    .filter(entry => entry.isDirectory() && !EXCLUDED_DIRS.includes(entry.name))
    .map(entry => entry.name);

  console.log('--- Generating All Integrations ---');

  for (const dir of integrationDirs) {
    const dirPath = path.join(INTEGRATIONS_DIR, dir);
    const generateScript = `${dir}-generate.ts`;
    const scriptPath = path.join(dirPath, generateScript);

    if (await fs.pathExists(scriptPath)) {
      console.log(`[${dir}] Running ${generateScript}...`);
      try {
        execSync(`tsx ${scriptPath}`, { stdio: 'inherit' });
      } catch (error) {
        console.error(`[${dir}] Failed to run generation script.`);
      }
    } else {
      console.log(`[${dir}] No generation script found (${generateScript}), skipping.`);
    }
  }

  console.log('--- Generation Complete ---');
}

generateAll();

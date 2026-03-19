import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { SWAGGER_SOURCE_URL, SWAGGER_LOCAL_PATH, INTEGRATIONS_DIR, EXCLUDED_DIRS } from '../src/constants.js';

async function syncSwagger() {
  try {
    console.log(`Fetching Swagger from ${SWAGGER_SOURCE_URL}...`);
    const response = await axios.get(SWAGGER_SOURCE_URL);
    const swaggerContent = JSON.stringify(response.data, null, 2);

    console.log(`Updating global Swagger file: ${SWAGGER_LOCAL_PATH}`);
    await fs.writeFile(SWAGGER_LOCAL_PATH, swaggerContent);
    console.log(`Updated: ${SWAGGER_LOCAL_PATH}`);

    console.log('Sync complete!');
  } catch (error) {
    console.error('Error syncing Swagger:', error);
    process.exit(1);
  }
}

syncSwagger();

import { describe, it, expect } from 'vitest';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { SWAGGER_SOURCE_URL, SWAGGER_LOCAL_PATH, INTEGRATIONS_DIR, EXCLUDED_DIRS } from '../src/constants.js';

describe('Swagger Compliance', () => {
  it('should have the latest swagger.json at the root', async () => {
    const response = await axios.get(SWAGGER_SOURCE_URL);
    const remoteSwagger = response.data;

    const exists = await fs.pathExists(SWAGGER_LOCAL_PATH);
    expect(exists, `swagger.json missing at root`).toBe(true);
    
    const localSwagger = await fs.readJson(SWAGGER_LOCAL_PATH);
    
    expect(localSwagger.info.version, `Version mismatch`).toBe(remoteSwagger.info.version);
    expect(localSwagger).toEqual(remoteSwagger);
  }, 10000);
});

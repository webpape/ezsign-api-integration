import fs from 'fs-extra';
import { ARAZZO_LOCAL_PATH } from './constants.js';

// --- Arazzo Types ---

export interface ArazzoParameter {
  name: string;
  in: string;
  value: string;
}

export interface ArazzoSuccessCriterion {
  condition: string;
}

export interface ArazzoRequestBody {
  contentType: string;
  payload: string;
}

export interface ArazzoStep {
  stepId: string;
  description: string;
  operationId: string;
  parameters?: ArazzoParameter[];
  requestBody?: ArazzoRequestBody;
  successCriteria: ArazzoSuccessCriterion[];
  outputs?: Record<string, string>;
}

export interface ArazzoWorkflow {
  workflowId: string;
  summary: string;
  description: string;
  steps: ArazzoStep[];
  outputs?: Record<string, string>;
}

export interface ArazzoSpec {
  arazzo: string;
  info: {
    title: string;
    summary: string;
    description: string;
    version: string;
  };
  sourceDescriptions: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  workflows: ArazzoWorkflow[];
}

// --- Integration Action (flat representation) ---

export interface IntegrationAction {
  operationId: string;
  stepId: string;
  label: string;
  description: string;
  workflowId: string;
  hasParameters: boolean;
  hasRequestBody: boolean;
  parameters?: ArazzoParameter[];
}

export interface IntegrationTrigger {
  key: string;
  label: string;
  description: string;
  operationId: string;
}

// --- Helpers ---

/**
 * Load and parse the arazzo.json spec file.
 */
export async function loadArazzo(): Promise<ArazzoSpec> {
  if (!(await fs.pathExists(ARAZZO_LOCAL_PATH))) {
    throw new Error(
      `Arazzo spec not found at ${ARAZZO_LOCAL_PATH}. Run 'yarn gen:arazzo' first.`
    );
  }
  return fs.readJson(ARAZZO_LOCAL_PATH);
}

/**
 * Get all workflows from the Arazzo spec.
 */
export function getWorkflows(arazzo: ArazzoSpec): ArazzoWorkflow[] {
  return arazzo.workflows;
}

/**
 * Get steps for a specific workflow.
 */
export function getStepsByWorkflow(arazzo: ArazzoSpec, workflowId: string): ArazzoStep[] {
  const workflow = arazzo.workflows.find(w => w.workflowId === workflowId);
  return workflow?.steps || [];
}

/**
 * Get all unique operationIds across all workflows.
 */
export function getOperationIds(arazzo: ArazzoSpec): string[] {
  const ids = new Set<string>();
  for (const workflow of arazzo.workflows) {
    for (const step of workflow.steps) {
      ids.add(step.operationId);
    }
  }
  return Array.from(ids);
}

/**
 * Build a flat list of integration actions from the Arazzo spec.
 * This maps each step into a simple action descriptor usable by generators.
 */
export function buildIntegrationActions(arazzo: ArazzoSpec): IntegrationAction[] {
  const actions: IntegrationAction[] = [];

  for (const workflow of arazzo.workflows) {
    for (const step of workflow.steps) {
      actions.push({
        operationId: step.operationId,
        stepId: step.stepId,
        label: step.description,
        description: step.description,
        workflowId: workflow.workflowId,
        hasParameters: !!step.parameters && step.parameters.length > 0,
        hasRequestBody: !!step.requestBody,
        parameters: step.parameters,
      });
    }
  }

  return actions;
}

/**
 * Standard triggers for eZsign integrations (from webhooks).
 */
export function getStandardTriggers(): IntegrationTrigger[] {
  return [
    {
      key: 'ezsignfolder_completed',
      label: 'Ezsignfolder Completed',
      description: 'Triggered when an Ezsignfolder is completed.',
      operationId: 'Ezsignfolder_Completed',
    },
    {
      key: 'ezsigndocument_completed',
      label: 'Ezsigndocument Completed',
      description: 'Triggered when an Ezsigndocument is completed.',
      operationId: 'Ezsigndocument_Completed',
    },
    {
      key: 'ezsignfoldersignerassociation_completed',
      label: 'Ezsignfoldersignerassociation Completed',
      description: 'Triggered when a Signer has completed their signatures.',
      operationId: 'Ezsignfoldersignerassociation_Completed',
    },
  ];
}

/**
 * Parsed endpoint from a platform's README.md
 */
export interface PlatformEndpoint {
  operationId: string;
  method: string;
  path: string;
  summary: string;
}

/**
 * Parsed webhook from a platform's README.md
 */
export interface PlatformWebhook {
  event: string;
  description: string;
}

/**
 * Parse a platform's README.md to extract its specific endpoints and webhooks.
 */
export async function parseReadme(readmePath: string): Promise<{
  platformName: string;
  endpoints: PlatformEndpoint[];
  webhooks: PlatformWebhook[];
  actions: string[];
}> {
  const content = await fs.readFile(readmePath, 'utf-8');
  const lines = content.split('\n');

  let platformName = '';
  const endpoints: PlatformEndpoint[] = [];
  const webhooks: PlatformWebhook[] = [];
  const actions: string[] = [];

  // Extract platform name from title
  const titleMatch = content.match(/^#\s+(.+?)(?:\s+Connector|\s+Connectors)/m);
  if (titleMatch) {
    platformName = titleMatch[1].replace(/ Integration - eZsign$/, '').trim();
  }

  // Extract webhooks
  const webhookRegex = /^\s*-\s*`([^`]+)`\s*->\s*(.+)$/gm;
  let webhookMatch;
  while ((webhookMatch = webhookRegex.exec(content)) !== null) {
    webhooks.push({
      event: webhookMatch[1],
      description: webhookMatch[2].trim(),
    });
  }

  // Extract endpoints - look for ### N. OperationId_Name
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Match endpoint header like "### 1. Activesession_GetCurrent_V2"
    const endpointHeader = line.match(/^###\s+\d+\.\s+(\S+)/);
    if (endpointHeader) {
      const operationId = endpointHeader[1];
      let method = '';
      let path = '';
      let summary = '';

      // Read following lines for method/path and summary
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const subLine = lines[j];
        const methodMatch = subLine.match(/^\s*-\s*\*\*(GET|POST|PUT|DELETE|PATCH)\*\*\s+`([^`]+)`/);
        if (methodMatch) {
          method = methodMatch[1];
          path = methodMatch[2];
        }
        const summaryMatch = subLine.match(/^\s*-\s*\*\*Summary\s*:\*\*\s*(.+)/);
        if (summaryMatch) {
          summary = summaryMatch[1].trim();
        }
      }

      endpoints.push({ operationId, method, path, summary });
    }

    // Match platform-specific actions like "## Actions Asana"
    const actionMatch = line.match(/^##\s+Actions\s+/);
    if (actionMatch) {
      // Read following bullet points
      for (let j = i + 1; j < lines.length; j++) {
        const actionLine = lines[j];
        if (actionLine.startsWith('## ') || actionLine.trim() === '') {
          if (actionLine.startsWith('## ')) break;
          continue;
        }
        const bulletMatch = actionLine.match(/^\s*-\s*\*\*(.+?)\s*:\*\*\s*(.+)/);
        if (bulletMatch) {
          actions.push(`${bulletMatch[1]}: ${bulletMatch[2].trim()}`);
        }
      }
    }

    i++;
  }

  return { platformName, endpoints, webhooks, actions };
}

/**
 * Build a platform-specific output by filtering arazzo actions
 * to only those referenced in the platform's README.md.
 */
export async function buildPlatformOutput(
  arazzo: ArazzoSpec,
  readmePath: string,
) {
  const platform = await parseReadme(readmePath);
  const allActions = buildIntegrationActions(arazzo);
  const triggers = getStandardTriggers();

  // Map README operationIds to their platform-specific summaries
  const readmeEndpoints = new Map(
    platform.endpoints.map(e => [e.operationId, e])
  );

  // Filter actions to only those in the README, with platform-specific descriptions
  const filteredActions = allActions
    .filter(a => readmeEndpoints.has(a.operationId))
    .map(a => {
      const readmeEndpoint = readmeEndpoints.get(a.operationId)!;
      return {
        key: a.operationId.toLowerCase(),
        label: a.label,
        description: readmeEndpoint.summary, // use platform-specific summary
        operationId: a.operationId,
        method: readmeEndpoint.method,
        path: readmeEndpoint.path,
        workflowId: a.workflowId,
        hasParameters: a.hasParameters,
        hasRequestBody: a.hasRequestBody,
      };
    });

  // Map webhooks to platform-specific triggers
  const platformTriggers = platform.webhooks.map(wh => ({
    key: wh.event.replace(/\./g, '_'),
    event: wh.event,
    label: wh.event,
    description: wh.description,
  }));

  return {
    version: arazzo.info.version,
    platform: platform.platformName,
    source: 'arazzo',
    generatedAt: new Date().toISOString(),
    webhooks: platformTriggers,
    actions: filteredActions,
    platformActions: platform.actions,
  };
}


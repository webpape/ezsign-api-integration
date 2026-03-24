import fs from 'fs-extra';
import { SWAGGER_LOCAL_PATH, ARAZZO_LOCAL_PATH } from '../src/constants.js';

interface SwaggerParameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  type?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  default?: string | number;
  schema?: { $ref?: string };
}

interface SwaggerOperation {
  operationId: string;
  summary: string;
  description?: string;
  deprecated?: boolean;
  parameters?: SwaggerParameter[];
  responses: Record<string, { description: string; schema?: { $ref?: string } }>;
  consumes?: string[];
  produces?: string[];
  'x-ms-visibility'?: string;
}

interface SwaggerPath {
  [method: string]: SwaggerOperation;
}

interface SwaggerDoc {
  swagger: string;
  info: {
    title: string;
    description: string;
    version: string;
    contact?: { email?: string; name?: string; url?: string };
    license?: { name?: string; url?: string };
  };
  host: string;
  basePath: string;
  schemes: string[];
  paths: Record<string, SwaggerPath>;
  securityDefinitions?: Record<string, unknown>;
  definitions?: Record<string, unknown>;
}

// --- Arazzo spec types ---

interface ArazzoParameter {
  name: string;
  in: string;
  value: string;
}

interface ArazzoSuccessCriterion {
  condition: string;
}

interface ArazzoStep {
  stepId: string;
  description: string;
  operationId: string;
  parameters?: ArazzoParameter[];
  requestBody?: {
    contentType: string;
    payload: string;
  };
  successCriteria: ArazzoSuccessCriterion[];
  outputs?: Record<string, string>;
}

interface ArazzoWorkflow {
  workflowId: string;
  summary: string;
  description: string;
  steps: ArazzoStep[];
  outputs?: Record<string, string>;
}

interface ArazzoSpec {
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

// --- Helpers ---

function operationIdToStepId(operationId: string): string {
  return operationId
    .replace(/_/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function buildParametersForStep(params: SwaggerParameter[]): ArazzoParameter[] {
  const arazzoParams: ArazzoParameter[] = [];

  for (const param of params) {
    if (param.in === 'body') continue; // handled separately by requestBody

    arazzoParams.push({
      name: param.name,
      in: param.in,
      value: `$inputs.${param.name}`,
    });
  }

  return arazzoParams;
}

function getSuccessStatusCodes(responses: Record<string, unknown>): string[] {
  return Object.keys(responses).filter(code => {
    const num = parseInt(code, 10);
    return num >= 200 && num < 300;
  });
}

function hasBodyParam(params?: SwaggerParameter[]): boolean {
  return !!params?.some(p => p.in === 'body');
}

function categorizeOperation(path: string, operationId: string): string {
  if (operationId.startsWith('Activesession_')) return 'session-management';
  if (operationId.startsWith('Communication_')) return 'communication';
  if (operationId.includes('_GetAutocomplete_')) return 'autocomplete-lookups';

  // Ezsigndocument operations
  if (operationId.startsWith('Ezsigndocument_')) return 'ezsigndocument-management';

  // Ezsignfolder operations (including signerassociation)
  if (
    operationId.startsWith('Ezsignfolder_') ||
    operationId.startsWith('Ezsignfoldersignerassociation_')
  ) {
    return 'ezsignfolder-lifecycle';
  }

  return 'general';
}

// --- Main ---

async function generateArazzo() {
  if (!(await fs.pathExists(SWAGGER_LOCAL_PATH))) {
    console.error(`Swagger file not found at ${SWAGGER_LOCAL_PATH}. Run 'yarn sync' first.`);
    process.exit(1);
  }

  const swagger: SwaggerDoc = await fs.readJson(SWAGGER_LOCAL_PATH);
  console.log(`[Arazzo] Using Swagger version: ${swagger.info.version}`);

  // Collect all operations grouped by workflow category
  const workflowMap = new Map<string, ArazzoStep[]>();

  for (const [path, methods] of Object.entries(swagger.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!operation.operationId) continue;

      const category = categorizeOperation(path, operation.operationId);

      if (!workflowMap.has(category)) {
        workflowMap.set(category, []);
      }

      const stepId = operationIdToStepId(operation.operationId);
      const params = operation.parameters ? buildParametersForStep(operation.parameters) : [];
      const successCodes = getSuccessStatusCodes(operation.responses);

      const step: ArazzoStep = {
        stepId,
        description: operation.summary || operation.description || operation.operationId,
        operationId: operation.operationId,
        successCriteria: successCodes.map(code => ({
          condition: `$statusCode == ${code}`,
        })),
      };

      // Add parameters if any (non-body)
      if (params.length > 0) {
        step.parameters = params;
      }

      // Add requestBody if operation has body param
      if (hasBodyParam(operation.parameters)) {
        step.requestBody = {
          contentType: operation.consumes?.[0] || 'application/json',
          payload: '$inputs.requestBody',
        };
      }

      // Add outputs for successful responses that have schemas
      const successResponse = operation.responses['200'] || operation.responses['201'];
      if (successResponse?.schema) {
        step.outputs = {
          responseBody: '$response.body',
        };
      }

      workflowMap.get(category)!.push(step);
    }
  }

  // Build workflow descriptions
  const workflowDescriptions: Record<string, { summary: string; description: string }> = {
    'ezsignfolder-lifecycle': {
      summary: 'Ezsignfolder Lifecycle Management',
      description:
        'Workflow covering the full lifecycle of an Ezsignfolder: creation, signer association, document ordering, sending for signature, and disposal.',
    },
    'ezsigndocument-management': {
      summary: 'Ezsigndocument Management',
      description:
        'Workflow for managing Ezsigndocuments: creation, applying templates, positioning elements by word, prefilling forms, and downloading signed documents.',
    },
    'autocomplete-lookups': {
      summary: 'Autocomplete Lookups',
      description:
        'Workflow for all autocomplete/dropdown lookup endpoints: foldertypes, templates, template packages, TSA requirements, languages, secret questions, tax assignments, users, and user login types.',
    },
    'session-management': {
      summary: 'Session Management',
      description: 'Workflow for managing active sessions and retrieving current session details.',
    },
    communication: {
      summary: 'Communication Management',
      description: 'Workflow for retrieving communication body content.',
    },
    general: {
      summary: 'General Operations',
      description: 'General API operations that do not fit into other workflow categories.',
    },
  };

  // Assemble workflows
  const workflows: ArazzoWorkflow[] = [];

  for (const [category, steps] of workflowMap) {
    const meta = workflowDescriptions[category] || {
      summary: category,
      description: `Operations for ${category}`,
    };

    const workflow: ArazzoWorkflow = {
      workflowId: category,
      summary: meta.summary,
      description: meta.description,
      steps,
    };

    // Add workflow-level outputs referencing last step's outputs
    const stepsWithOutputs = steps.filter(s => s.outputs);
    if (stepsWithOutputs.length > 0) {
      workflow.outputs = {};
      for (const step of stepsWithOutputs) {
        workflow.outputs[`${step.stepId}-result`] = `$steps.${step.stepId}.outputs.responseBody`;
      }
    }

    workflows.push(workflow);
  }

  // Sort workflows in logical order
  const workflowOrder = [
    'session-management',
    'ezsignfolder-lifecycle',
    'ezsigndocument-management',
    'autocomplete-lookups',
    'communication',
    'general',
  ];
  workflows.sort((a, b) => {
    const ai = workflowOrder.indexOf(a.workflowId);
    const bi = workflowOrder.indexOf(b.workflowId);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  // Assemble the Arazzo spec
  const arazzo: ArazzoSpec = {
    arazzo: '1.0.1',
    info: {
      title: 'eZsign API Workflows',
      summary:
        'Arazzo workflows describing the eZmax/eZsign API operations for integration platforms.',
      description: `Auto-generated Arazzo specification from the eZmax API Definition (PowerAutomate) swagger.\nSource version: ${swagger.info.version}\nGenerated at: ${new Date().toISOString()}`,
      version: swagger.info.version,
    },
    sourceDescriptions: [
      {
        name: 'ezsignApi',
        url: './swagger.json',
        type: 'openapi',
      },
    ],
    workflows,
  };

  await fs.writeJson(ARAZZO_LOCAL_PATH, arazzo, { spaces: 2 });

  // Summary stats
  const totalSteps = workflows.reduce((sum, w) => sum + w.steps.length, 0);
  console.log(`[Arazzo] Generated ${ARAZZO_LOCAL_PATH}`);
  console.log(`[Arazzo] ${workflows.length} workflows, ${totalSteps} total steps`);
  for (const w of workflows) {
    console.log(`  - ${w.workflowId}: ${w.steps.length} steps`);
  }
}

generateArazzo();

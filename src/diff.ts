import type { SchemaChange, JsonSchema } from './types.js';

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function diffObjects(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  path: string,
  changes: SchemaChange[],
): void {
  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const key of allKeys) {
    const fullPath = path ? `${path}.${key}` : key;
    const inBefore = key in before;
    const inAfter = key in after;

    if (inBefore && !inAfter) {
      changes.push({
        path: fullPath,
        type: 'removed',
        breaking: true,
        before: before[key],
        message: `Removed "${fullPath}"`,
      });
    } else if (!inBefore && inAfter) {
      changes.push({
        path: fullPath,
        type: 'added',
        breaking: false,
        after: after[key],
        message: `Added "${fullPath}"`,
      });
    } else {
      const bVal = before[key];
      const aVal = after[key];

      if (isObject(bVal) && isObject(aVal)) {
        diffObjects(bVal, aVal, fullPath, changes);
      } else if (Array.isArray(bVal) && Array.isArray(aVal)) {
        if (JSON.stringify(bVal) !== JSON.stringify(aVal)) {
          changes.push({
            path: fullPath,
            type: 'changed',
            breaking: true,
            before: bVal,
            after: aVal,
            message: `Changed "${fullPath}"`,
          });
        }
      } else if (bVal !== aVal) {
        const isTypeChange = key === 'type';
        const isRequiredChange = key === 'required' && aVal === true && bVal !== true;
        changes.push({
          path: fullPath,
          type: 'changed',
          breaking: isTypeChange || isRequiredChange,
          before: bVal,
          after: aVal,
          message: `Changed "${fullPath}" from ${JSON.stringify(bVal)} to ${JSON.stringify(aVal)}`,
        });
      }
    }
  }
}

export function diffSchemas(before: JsonSchema, after: JsonSchema): SchemaChange[] {
  const changes: SchemaChange[] = [];
  diffObjects(before, after, '', changes);
  return changes;
}

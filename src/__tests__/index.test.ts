import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('schema-diff', () => {
  it('should export diffSchemas', () => {
    assert.ok(mod.diffSchemas);
  });
});

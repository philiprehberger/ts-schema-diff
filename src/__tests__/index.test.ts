import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('schema-diff', () => {
  it('should export diffSchemas', () => {
    assert.ok(mod.diffSchemas);
  });

  it('breakingOnly: true filters out non-breaking changes', () => {
    const before = { name: { type: 'string' } };
    const after = { name: { type: 'string' }, age: { type: 'number' } };

    const all = mod.diffSchemas(before, after);
    const breaking = mod.diffSchemas(before, after, { breakingOnly: true });

    assert.ok(all.some((c: { type: string }) => c.type === 'added'));
    assert.equal(breaking.length, 0);
  });

  it('breakingOnly: true returns same set when all changes are breaking', () => {
    const before = { email: { type: 'string' }, name: { type: 'string' } };
    const after = { name: { type: 'number' } };

    const all = mod.diffSchemas(before, after);
    const breaking = mod.diffSchemas(before, after, { breakingOnly: true });

    assert.ok(all.length > 0);
    assert.ok(all.every((c: { breaking: boolean }) => c.breaking === true));
    assert.deepEqual(breaking, all);
  });
});

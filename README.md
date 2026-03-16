# @philiprehberger/ts-schema-diff

[![CI](https://github.com/philiprehberger/ts-schema-diff/actions/workflows/publish.yml/badge.svg)](https://github.com/philiprehberger/ts-schema-diff/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/ts-schema-diff.svg)](https://www.npmjs.com/package/@philiprehberger/ts-schema-diff)
[![License](https://img.shields.io/github/license/philiprehberger/ts-schema-diff)](LICENSE)

Compare JSON schemas and detect breaking changes.

## Installation

```bash
npm install @philiprehberger/ts-schema-diff
```

## Usage

```ts
import { diffSchemas } from '@philiprehberger/ts-schema-diff';

const changes = diffSchemas(
  { name: { type: 'string' }, email: { type: 'string' } },
  { name: { type: 'string' }, age: { type: 'number' } },
);

// [
//   { path: 'email', type: 'removed', breaking: true, message: 'Removed "email"' },
//   { path: 'age', type: 'added', breaking: false, message: 'Added "age"' },
// ]

const hasBreaking = changes.some(c => c.breaking);
```

## API

| Export | Description |
|--------|-------------|
| `diffSchemas(before, after)` | Deep-compare two schemas, returns `SchemaChange[]` |

### `SchemaChange`

| Property | Type | Description |
|----------|------|-------------|
| `path` | `string` | Dot-separated path |
| `type` | `'added' \| 'removed' \| 'changed'` | Change type |
| `breaking` | `boolean` | Whether the change is breaking |
| `before` | `unknown` | Previous value |
| `after` | `unknown` | New value |
| `message` | `string` | Human-readable description |


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT

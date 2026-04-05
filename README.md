# @philiprehberger/schema-diff

[![CI](https://github.com/philiprehberger/ts-schema-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-schema-diff/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/schema-diff.svg)](https://www.npmjs.com/package/@philiprehberger/schema-diff)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-schema-diff)](https://github.com/philiprehberger/ts-schema-diff/commits/main)

Compare JSON schemas and detect breaking changes

## Installation

```bash
npm install @philiprehberger/schema-diff
```

## Usage

```ts
import { diffSchemas } from '@philiprehberger/schema-diff';

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

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-schema-diff)

🐛 [Report issues](https://github.com/philiprehberger/ts-schema-diff/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-schema-diff/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)

export type ChangeType = 'added' | 'removed' | 'changed';

export interface SchemaChange {
  path: string;
  type: ChangeType;
  breaking: boolean;
  before?: unknown;
  after?: unknown;
  message: string;
}

export type JsonSchema = Record<string, unknown>;

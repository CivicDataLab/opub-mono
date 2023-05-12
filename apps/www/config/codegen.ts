import type { CodegenConfig } from '@graphql-codegen/cli';

import { GRAPHQL_URL } from './site';

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_URL,
  documents: 'lib/graphql/**/*.graphql',
  generates: {
    './lib/graphql/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
};

export default config;

import type { CodegenConfig } from '@graphql-codegen/cli';

import { gqlConfig } from './site';

const config: CodegenConfig = {
  schema: gqlConfig.url,
  documents: 'app/**/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    './gql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;

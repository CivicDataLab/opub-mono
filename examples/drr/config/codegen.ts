import type { CodegenConfig } from '@graphql-codegen/cli';

import { gqlConfig } from './site';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './gql/generated/datasets/': {
      documents: 'config/**/dataset-queries.ts',
      schema: gqlConfig.datasets ,
      preset: 'client',
      plugins: [],
    },
    './gql/generated/analytics/': {
      documents: 'config/**/analaytics-queries.ts',
      schema: gqlConfig.analytics ,
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;

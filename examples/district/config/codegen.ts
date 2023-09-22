import { gqlConfig } from './site';
import type { CodegenConfig } from '@graphql-codegen/cli';

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

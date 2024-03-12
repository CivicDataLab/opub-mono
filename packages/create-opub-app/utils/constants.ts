export const examples: {
  [key: string]: { label: string; link: string };
} = {
  d4d: {
    label: 'D4D',
    link: 'https://github.com/CivicDataLab/opub-mono/tree/main/examples/district',
  },
  'data-exchange': {
    label: 'Data Exchange',
    link: 'https://github.com/CivicDataLab/opub-mono/tree/main/examples/data-exchange',
  },
  drr: {
    label: 'DRR',
    link: 'https://github.com/CivicDataLab/opub-mono/tree/main/examples/drr',
  },
};

export const managers: {
  [key: string]: string;
} = {
  npm: 'NPM',
  pnpm: 'PNPM',
  yarn: 'Yarn',
  bun: 'Bun',
};

export const packagesToInstall: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  dependencies: {
    'opub-ui': 'latest',
  },
  devDependencies: {
    'opub-tokens': 'latest',
    typescript: '^5.0.4',
    prettier: '^3.2.4',
    '@ianvs/prettier-plugin-sort-imports': '^4.1.1',
    'prettier-plugin-tailwindcss': '^0.5.11',
    eslint: '^8.57.0',
    '@typescript-eslint/eslint-plugin': '^6.21.0',
    'eslint-config-next': '^14.1.2',
    'eslint-config-prettier': '^9.1.0',
  },
};

export const packagesToRemove = [
  '@repo/config-ts',
  '@repo/eslint-config',
  '@repo/prettier-config',
];

export const TITLE_TEXT = `   ____                _          ___  ____        _          _
  / ___|_ __ ___  __ _| |_ ___   / _ \\|  _ \\ _   _| |__      / \\   _ __  _ __
 | |   | '__/ _ \\/ \_\` | __/ _ \\ | | | | |_) | | | | '_ \\    / _ \\ | '_ \\| '_ \\
 | |___| | |  __/ (_| | ||  __/ | |_| |  __/| |_| | |_) |  / ___ \\| |_) | |_) |
  \\____|_|  \\___|\\__,_|\\__\\___|  \\___/|_|    \\__,_|_.__/  /_/   \\_\\ .__/| .__/
                                                                  |_|   |_| `;

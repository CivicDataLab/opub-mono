#! /usr/bin/env node
import * as p from '@clack/prompts';
import { Command } from 'commander';
import { cyan, green, red } from 'picocolors';

import { createApp } from './create-app';
import { isFolderEmpty } from './helpers/is-folder-empty';
import packageJson from './package.json';
import { examples } from './utils/constants';
import { validateAppName } from './utils/validateAppName';

const figlet = require('figlet');

const fs = require('fs');
const path = require('path');

let projectPath: string;

const handleSigTerm = () => process.exit(0);

process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

const program = new Command(packageJson.name);

program.version(packageJson.version).description(packageJson.description);

program
  .arguments('[project-directory]')
  .usage(`${green('<project-directory>')} [options]`)
  .action((name: string) => {
    projectPath = name;
  });

program
  .option(
    '--use-npm',
    `

  Explicitly tell the CLI to bootstrap the application using npm
`
  )
  .option(
    '--use-pnpm',
    `

  Explicitly tell the CLI to bootstrap the application using pnpm
`
  )
  .option(
    '--use-yarn',
    `

  Explicitly tell the CLI to bootstrap the application using Yarn
`
  )
  .option(
    '--use-bun',
    `

  Explicitly tell the CLI to bootstrap the application using Bun
`
  )
  .option(
    '-e, --example [d4d | data-exchange | <example-url>]',
    `

  An example to bootstrap the app with. Currently supports ${green('d4d')} 
  and ${green('data-exchange')}
`
  )
  .allowUnknownOption();
program.parse();

console.log(
  figlet.textSync('OPub', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  })
);

const options: {
  useNpm: boolean;
  usePnpm: boolean;
  useYarn: boolean;
  useBun: boolean;
  example: boolean | string;
} = program.opts();

async function run(): Promise<void> {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  /**
   * Get valid examples
   */
  if (options.example === true) {
    console.error(
      'Please provide an example name or url, otherwise remove the example option.'
    );
    process.exit(1);
  }

  const example =
    (typeof options.example === 'string' && options.example.trim()) || 'd4d';

  if (!Object.keys(examples).includes(example)) {
    console.error(
      `The example provided is not supported. Please provide a valid example. We support ${green('d4d')} and ${green('data-exchange')}`
    );
    process.exit(1);
  }

  let packageManager = options.useNpm
    ? 'npm'
    : options.usePnpm
      ? 'pnpm'
      : options.useYarn
        ? 'yarn'
        : options.useBun
          ? 'bun'
          : undefined;

  const project = await p.group(
    {
      ...(!projectPath && {
        projectPath: () => {
          return p.text({
            message: 'What will your project be called?',
            defaultValue: 'my-opub-app',
            validate: validateAppName,
          });
        },
      }),
      ...(!options.example && {
        example: () => {
          return p.select({
            message: 'Which example will you use?',
            options: Object.keys(examples).map((item) => ({
              value: item,
              label: examples[item].label,
            })),
            initialValue: 'd4d',
          });
        },
      }),
      ...(!packageManager && {
        packageManager: () => {
          return p.select({
            message: 'Which package manager will you use?',
            options: [
              { value: 'npm', label: 'NPM' },
              { value: 'pnpm', label: 'PNPM' },
              { value: 'yarn', label: 'Yarn' },
              { value: 'bun', label: 'Bun' },
            ],
            initialValue: 'npm',
          });
        },
      }),
    },
    {
      onCancel() {
        process.exit(1);
      },
    }
  );

  projectPath = projectPath || (project.projectPath as string);
  const resolvedProjectPath = path.resolve(projectPath);

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const root = path.resolve(resolvedProjectPath);
  const appName = path.basename(root);
  const folderExists = fs.existsSync(root);

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  /**
   * Create the app
   */

  const exampleKey = options.example || (project.example as string);
  packageManager = packageManager || (project.packageManager as string);

  createApp({
    example: examples[exampleKey].link,
    projectPath,
    packageManager,
  });
}

run().catch(async (reason) => {
  console.log();
  console.log('Aborting installation.');
  if (reason.command) {
    console.log(`  ${cyan(reason.command)} has failed.`);
  } else {
    console.log(
      red('Unexpected error. Please report it as a bug:') + '\n',
      reason
    );
  }
  console.log();
  process.exit(1);
});

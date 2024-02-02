#! /usr/bin/env node
import { Command } from 'commander';
import { bold, cyan, green, red } from 'picocolors';
import type { InitialReturnValue } from 'prompts';
import prompts from 'prompts';

import { createApp } from './create-app';
import { getPkgManager } from './helpers/get-pkg-manager';
import { isFolderEmpty } from './helpers/is-folder-empty';
import { validateNpmName } from './helpers/validate-pkg';
import packageJson from './package.json';

const figlet = require('figlet');

const fs = require('fs');
const path = require('path');

let projectPath: string = '';

const handleSigTerm = () => process.exit(0);

process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

const onPromptState = (state: {
  value: InitialReturnValue;
  aborted: boolean;
  exited: boolean;
}) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write('\x1B[?25h');
    process.stdout.write('\n');
    process.exit(1);
  }
};

const examples: {
  [key: string]: string;
} = {
  d4d: 'https://github.com/CivicDataLab/opub-mono/tree/main/examples/district',
  'data-exchange':
    'https://github.com/CivicDataLab/opub-mono/tree/main/apps/www',
};

let selectedExample: string | undefined;

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

const options = program.opts();

const packageManager = options.useNpm
  ? 'npm'
  : options.usePnpm
    ? 'pnpm'
    : options.useYarn
      ? 'yarn'
      : options.useBun
        ? 'bun'
        : getPkgManager();

async function run(): Promise<void> {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  /**
   * Get and verify project path and name
   */
  if (!projectPath) {
    const res = await prompts({
      onState: onPromptState,
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (name) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return 'Invalid project name: ' + validation.problems[0];
      },
    });

    if (typeof res.path === 'string') {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${cyan(program.name())} ${green('<project-directory>')}\n` +
        'For example:\n' +
        `  ${cyan(program.name())} ${green('my-next-app')}\n\n` +
        `Run ${cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const validation = validateNpmName(projectName);
  if (!validation.valid) {
    console.error(
      `Could not create a project called ${red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    validation.problems.forEach((p) =>
      console.error(`    ${red(bold('*'))} ${p}`)
    );
    process.exit(1);
  }

  if (options.example === true) {
    console.error(
      'Please provide an example name or url, otherwise remove the example option.'
    );
    process.exit(1);
  }

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
   * Get valid examples
   */
  const example =
    (typeof options.example === 'string' && options.example.trim()) || 'd4d';

  if (!Object.keys(examples).includes(example)) {
    console.error(
      `The example provided is not supported. Please provide a valid example. We support ${green('d4d')} and ${green('data-exchange')}`
    );
    process.exit(1);
  }

  /**
   * Create the app
   */
  createApp({
    example: examples[example],
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

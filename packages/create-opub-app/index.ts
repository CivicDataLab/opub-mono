#! /usr/bin/env node
import fs from 'fs';
import path from 'path';

import { createApp } from './create-app';
import packageJson from './package.json';
import { examples } from './utils/constants';
import { initCli } from './utils/initCli';
import { isFolderEmpty } from './utils/is-folder-empty';
import { colors } from './utils/logger';
import { prompts } from './utils/prompts';
import { renderTitle } from './utils/renderTitle';

// terminate process on these signals
const handleSigTerm = () => process.exit(0);
process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

// initialize the CLI and get the options
const initOptions = initCli(packageJson);

async function run(): Promise<void> {
  let projectPath = initOptions.path;
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  /**
   * Get valid example
   */
  // -e or --example
  if (initOptions.example === true) {
    console.error(
      'Please provide an example name, otherwise remove the example option.'
    );
    process.exit(1);
  }

  // -e d4d or --example d4d
  const example =
    typeof initOptions.example === 'string' ? initOptions.example.trim() : null;

  if (example && !Object.keys(examples).includes(example)) {
    console.error(
      `The example provided is not supported. Please provide a valid example. We support ${colors.success('d4d')} and ${colors.success('data-exchange')}`
    );
    process.exit(1);
  }

  /**
   * Get valid package manager
   */
  // -m or --manager
  if (initOptions.manager === true) {
    console.error(
      'Please provide an manager name, otherwise remove the manager option.'
    );
    process.exit(1);
  }

  // -m npm or --manager npm
  const manager =
    typeof initOptions.manager === 'string'
      ? initOptions.manager.toLowerCase().trim()
      : null;

  if (manager && !['npm', 'pnpm', 'yarn', 'bun'].includes(manager)) {
    console.error(
      `The package manager provided is not supported. Please provide a valid manager. We support ${colors.success('d4d')} and ${colors.success('data-exchange')}`
    );
    process.exit(1);
  }

  // UI only
  renderTitle();

  const promptOptions = await prompts({
    projectPath,
    example,
    manager,
  });

  const resolvedProjectPath = path.resolve(promptOptions.projectPath);

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
  createApp({
    example: examples[promptOptions.example].link,
    projectPath: promptOptions.projectPath,
    packageManager: promptOptions.manager,
  });
}

run().catch(async (reason) => {
  console.log();
  console.log('Aborting installation.');
  if (reason.command) {
    console.log(`  ${colors.info(reason.command)} has failed.`);
  } else {
    console.log(
      colors.error('Unexpected error. Please report it as a bug:') + '\n',
      reason
    );
  }
  console.log();
  process.exit(1);
});

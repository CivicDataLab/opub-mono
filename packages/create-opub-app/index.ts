#! /usr/bin/env node
import fs from 'fs';
import path from 'path';

import { createApp } from './create-app';
import packageJson from './package.json';
import { examples, managers } from './utils/constants';
import { initCli } from './utils/initCli';
import { isFolderEmpty } from './utils/is-folder-empty';
import { isWriteable } from './utils/is-writeable';
import { colors } from './utils/logger';
import { prompts } from './utils/prompts';
import { renderTitle } from './utils/renderTitle';
import { validateAppName } from './utils/validateAppName';

// terminate process on these signals
const handleSigTerm = () => process.exit(0);
process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

// initialize the CLI and get the options
const initOptions = initCli(packageJson);

async function run(): Promise<void> {
  /**
   * Get valid project name
   */
  let projectPath = initOptions.path;
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
    if (validateAppName(projectPath)) {
      console.error(
        `The project name provided is not valid. Please provide a valid name.`
      );
      process.exit(1);
    }
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

  if (manager && !Object.keys(managers).includes(manager)) {
    console.error(
      `The package manager provided is not supported. Please provide a valid manager. We support ${colors.success('d4d')} and ${colors.success('data-exchange')}`
    );
    process.exit(1);
  }
  const noGit = initOptions.noGit;
  const noInstall = initOptions.noInstall;

  // UI only
  renderTitle();

  const promptOptions = await prompts({
    projectPath,
    example,
    manager,
    noGit,
    noInstall,
  });

  const resolvedProjectPath = path.resolve(promptOptions.projectPath);

  /**
   * Verify the project dir is empty or doesn't exist or is a writable folder
   */
  const root = path.resolve(resolvedProjectPath);
  const appName = path.basename(root);

  const folderExists = fs.existsSync(root);
  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    );
    console.error(
      'It is likely you do not have write permissions for this folder.'
    );
    process.exit(1);
  }

  /**
   * Create the app
   */
  createApp({
    example: examples[promptOptions.example].link,
    projectPath: promptOptions.projectPath,
    packageManager: promptOptions.manager,
    noGit: promptOptions.noGit,
    noInstall: promptOptions.noInstall,
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

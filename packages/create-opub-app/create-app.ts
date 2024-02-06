import fs from 'fs';
import path from 'path';
import retry from 'async-retry';
import fse from 'fs-extra';

import { initializeGit } from './utils/git';
import { install } from './utils/install';
import { isFolderEmpty } from './utils/is-folder-empty';
import { isWriteable } from './utils/is-writeable';
import { colors, logger } from './utils/logger';
import { nextSteps } from './utils/next-steps';
import { downloadAndExtractRepo, verifyURL } from './utils/repo';

export class DownloadError extends Error {}

function isErrorLike(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    typeof (err as { message?: unknown }).message === 'string'
  );
}

export async function createApp({
  example,
  noInstall,
  noGit,
  packageManager,
  projectPath,
}: {
  example: string;
  noInstall: boolean;
  noGit: boolean;
  packageManager: string;
  projectPath: string;
}) {
  console.log();
  logger.info(
    `Using ${packageManager} as package manager. ${packageManager !== 'npm' ? 'Do make sure you have it installed locally.' : ''}`
  );
  console.log();

  const root = path.resolve(projectPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    );
    console.error(
      'It is likely you do not have write permissions for this folder.'
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await fs.promises.mkdir(root, { recursive: true });
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const repoInfo = await verifyURL(example);

  console.log(`Creating a new OPub app in ${colors.success(root)}.`);
  console.log();

  // change current directory to the project directory
  process.chdir(root);

  try {
    if (repoInfo) {
      console.log(`Downloading files from repo ${colors.info(example)}`);
      console.log();
      await retry(() => downloadAndExtractRepo(root, { ...repoInfo }), {
        retries: 3,
      });
    }
  } catch (reason) {
    throw new DownloadError(isErrorLike(reason) ? reason.message : reason + '');
  }

  const packageJsonPath = path.join(root, 'package.json');
  let hasPackageJson = fs.existsSync(packageJsonPath);
  if (hasPackageJson) {
    console.log(
      `Installing packages using ${packageManager}. Grab a cup of chai, this might take a while.`
    );
    console.log();

    // add changes to package.json
    const pkgJson = fse.readJSONSync(packageJsonPath);
    // update the project name in package json
    pkgJson.name = appName;
    // add opub-ui as a dependency
    pkgJson.dependencies['opub-ui'] = 'latest';
    fse.writeJSONSync(packageJsonPath, pkgJson, {
      spaces: 2,
    });

    // install all packages in the project
    if (!noInstall) {
      await install(packageManager);
      console.log();
    }

    if (!noGit) {
      await initializeGit(root);
    }

    console.log();
    console.log(
      `${colors.success('Success!')} Created ${colors.info(appName)} at ${root}`
    );
    console.log();

    nextSteps({
      appName,
      projectPath,
      packageManager,
    });
  }
}

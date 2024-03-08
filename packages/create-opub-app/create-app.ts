import fs from 'fs';
import path from 'path';
import retry from 'async-retry';
import fse from 'fs-extra';

import { packagesToInstall, packagesToRemove } from './utils/constants';
import { initializeGit } from './utils/git';
import { install } from './utils/install';
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

  const repoInfo = await verifyURL(example);

  const root = path.resolve(projectPath);
  console.log(`Creating a new OPub app in ${colors.success(root)}.`);
  console.log();

  // create the project directory
  await fs.promises.mkdir(root, { recursive: true });
  // change current directory to the project
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
    // add changes to package.json
    const pkgJson = fse.readJSONSync(packageJsonPath);
    // update the project name in package json
    const appName = path.basename(root);
    pkgJson.name = appName;

    // add the packages to install
    Object.keys(packagesToInstall).forEach((type: any) => {
      Object.keys(packagesToInstall[type]).forEach((pkg) => {
        pkgJson[type][pkg] = packagesToInstall[type][pkg];
      });
    });

    // remove the packages from devDependencies
    packagesToRemove.forEach((pkg) => {
      delete pkgJson.devDependencies[pkg];
    });

    // write the changes to package.json
    fse.writeJSONSync(packageJsonPath, pkgJson, {
      spaces: 2,
    });

    // install all packages in the project
    if (!noInstall) {
      console.log(
        `Installing packages using ${packageManager}. Grab a cup of chai, this might take a while.`
      );
      console.log();
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

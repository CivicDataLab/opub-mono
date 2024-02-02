import fs from 'fs';
import path from 'path';
import retry from 'async-retry';
import { cyan, green, red } from 'picocolors';

import {
  downloadAndExtractRepo,
  getRepoInfo,
  hasRepo,
  RepoInfo,
} from './helpers/examples';
import { install } from './helpers/install';
import { isFolderEmpty } from './helpers/is-folder-empty';
import { getOnline } from './helpers/is-online';
import { isWriteable } from './helpers/is-writeable';
import { makeDir } from './helpers/make-dir';

export class DownloadError extends Error {}

function isErrorLike(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    typeof (err as { message?: unknown }).message === 'string'
  );
}

let repoInfo: RepoInfo | undefined;
export async function createApp({
  example,
  projectPath,
  packageManager,
}: {
  example: string;
  projectPath: string;
  packageManager: string;
}) {
  console.log();
  console.log(
    cyan(
      `Using ${packageManager} as package manager. ${packageManager !== 'npm' ? 'Do make sure you have it installed locally.' : ''}`
    )
  );
  console.log();

  if (example) {
    let repoUrl: URL | undefined;
    try {
      repoUrl = new URL(example);
    } catch (error: any) {
      if (error.code !== 'ERR_INVALID_URL') {
        console.error(error);
        process.exit(1);
      }
    }

    if (repoUrl) {
      if (repoUrl.origin !== 'https://github.com') {
        console.error(
          `Invalid URL: ${red(
            `"${example}"`
          )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`
        );
        process.exit(1);
      }

      repoInfo = await getRepoInfo(repoUrl);

      if (!repoInfo) {
        console.error(
          `Found invalid GitHub URL: ${red(
            `"${example}"`
          )}. Please fix the URL and try again.`
        );
        process.exit(1);
      }

      const found = await hasRepo(repoInfo);

      if (!found) {
        console.error(
          `Could not locate the repository for ${red(
            `"${example}"`
          )}. Please check that the repository exists and try again.`
        );
        process.exit(1);
      }
    }
  }

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

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = packageManager === 'yarn';
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  console.log(`Creating a new OPub app in ${green(root)}.`);
  console.log();

  process.chdir(root);

  const packageJsonPath = path.join(root, 'package.json');
  let hasPackageJson = false;

  try {
    if (repoInfo) {
      const repoInfo2 = repoInfo;
      console.log(`Downloading files from repo ${cyan(example)}`);
      console.log();
      await retry(() => downloadAndExtractRepo(root, repoInfo2), {
        retries: 3,
      });
    }
  } catch (reason) {
    throw new DownloadError(isErrorLike(reason) ? reason.message : reason + '');
  }

  hasPackageJson = fs.existsSync(packageJsonPath);
  if (hasPackageJson) {
    console.log(
      `Installing packages using ${packageManager}. Grab a cup of chai, this might take a while.`
    );
    console.log();

    await install(packageManager, isOnline);
    console.log();

    let cdpath: string;
    if (path.join(originalDirectory, appName) === projectPath) {
      cdpath = appName;
    } else {
      cdpath = projectPath;
    }

    console.log(`${green('Success!')} Created ${appName} at ${projectPath}`);

    if (hasPackageJson) {
      console.log('Inside that directory, you can run several commands:');
      console.log();
      console.log(cyan(`  ${packageManager} ${useYarn ? '' : 'run '}dev`));
      console.log('    Starts the development server.');
      console.log();
      console.log(cyan(`  ${packageManager} ${useYarn ? '' : 'run '}build`));
      console.log('    Builds the app for production.');
      console.log();
      console.log(cyan(`  ${packageManager} start`));
      console.log('    Runs the built app in production mode.');
      console.log();
      console.log('We suggest that you begin by typing:');
      console.log();
      console.log(cyan('  cd'), cdpath);
      console.log(`  ${cyan(`${packageManager} ${useYarn ? '' : 'run '}dev`)}`);
    }
    console.log();
  }
}

import path from 'path';

import { colors, logger } from './logger';

export function nextSteps({
  appName,
  projectPath,
  packageManager,
}: {
  appName: string;
  projectPath: string;
  packageManager: string;
}) {
  let cdpath: string;
  const originalDirectory = process.cwd();
  if (path.join(originalDirectory, appName) === projectPath) {
    cdpath = appName;
  } else {
    cdpath = projectPath;
  }

  const useNpm = packageManager === 'npm';
  console.log('Inside that directory, you can run several commands:');
  console.log();

  logger.info(`  ${packageManager} ${useNpm ? 'run ' : ''}dev`);
  console.log('    Starts the development server.');
  console.log();

  logger.info(`  ${packageManager} ${useNpm ? 'run ' : ''}build`);
  console.log('    Builds the app for production.');
  console.log();

  logger.info(`  ${packageManager} start`);
  console.log('    Runs the built app in production mode.');
  console.log();

  console.log('We suggest that you begin by typing:');
  console.log();

  console.log(colors.info('  cd'), cdpath);
  logger.info(`  ${packageManager} ${useNpm ? 'run ' : ''}dev`);

  console.log();
}

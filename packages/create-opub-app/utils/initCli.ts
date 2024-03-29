import { Command } from 'commander';

import { colors } from './logger';

let projectPath: string;

export function initCli(packageJson: {
  name: string | undefined;
  version: string;
  description: string;
}) {
  const program = new Command(packageJson.name);
  program.version(packageJson.version).description(packageJson.description);
  program
    .arguments('[project-directory]')
    .usage(`${colors.success('[project-directory]')} [options]`)
    .action((name: string) => {
      projectPath = name;
    });
  program
    .option(
      '-m, --manager [npm | pnpm | yarn | bun]',
      `

  Explicitly tell the CLI to bootstrap the application using specific package manager
`
    )
    .option(
      '-e, --example [d4d | data-exchange]',
      `

  An example to bootstrap the app with. Currently supports ${colors.success('d4d')} 
  and ${colors.success('data-exchange')}
`
    )
    .option(
      '--noGit',
      'Explicitly tell the CLI to not initialize a new git repo in the project',
      false
    )
    .option(
      '--noInstall',
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .allowUnknownOption();
  program.parse();

  const options: {
    manager: string | boolean;
    example: boolean | string;
    path: string;
    noGit: boolean;
    noInstall: boolean;
  } = program.opts();

  options.path = projectPath;

  return options;
}

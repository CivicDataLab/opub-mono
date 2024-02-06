import * as p from '@clack/prompts';

import { examples } from './constants';
import { validateAppName } from './validateAppName';

export async function prompts({
  projectPath,
  example,
  manager,
  noGit,
  noInstall,
}: {
  projectPath: string | null;
  example: string | null;
  manager: string | null;
  noGit: boolean;
  noInstall: boolean;
}) {
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
      ...(!example && {
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
      ...(!manager && {
        manager: () => {
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
      ...(!noGit && {
        git: () => {
          return p.confirm({
            message:
              'Should we initialize a Git repository and stage the changes?',
            initialValue: true,
          });
        },
      }),
      ...(!noInstall && {
        install: () => {
          return p.confirm({
            message: `Should we install the dependencies for you?`,
            initialValue: true,
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

  const options = {
    projectPath: projectPath || (project.projectPath as string),
    example: example || (project.example as string),
    manager: manager || (project.manager as string),
    noGit: noGit || !project.git,
    noInstall: noInstall || !project.install,
  };

  return options;
}

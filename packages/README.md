# OPub Mono Packages

OPub Monorepo has multiple packages, some are published to npm, some are not. Here is a list of all the packages in this monorepo:

- [opub-ui](./opub-ui/README.md): Design system and UI components for OPub.
- [opub-tokens](./opub-tokens/): A tool to generate design tokens from a Figma variables.
- [create-opub-app](./create-opub-app/README.md): A CLI tool to create a new OPub project.
- [config-eslint](./config-eslint/): A shared ESLint configuration for OPub projects.
- [config-prettier](./config-prettier/): A shared Prettier configuration for OPub projects.
- [config-ts](./config-ts/): A shared TypeScript configuration for OPub projects.

## Configs

The configs are used by packages and projects in the example directory. They are not published to npm. The packages use them directly, while the projects in the example directory need their own copy of the configs.

To sync the configs with the example projects, run the following command from the root of the monorepo:

```bash
npm run sync-config
```

This will run the script from [sync-config.js](../utils/sync-config.js) and copy the configs to the example projects.

## Publishing

To publish a package to npm, update the `package.json` version of update package and run the following command from the root of the monorepo:

```bash
npm run publish
```

This will look for all the packages with a new version and publish them to npm.

> You need to be logged in to npm to publish packages.

## License

All packages in this monorepo are licensed under the MIT License.

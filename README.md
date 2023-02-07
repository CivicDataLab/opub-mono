# OPub Mono

A WIP platform to speed up the development of open data dashboards.

## What's inside?

This repo built using turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd opub-mono
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd opub-mono
yarn run dev
```

### New Component

To auto generate the boilerplate for new a component, install the `new-component` module globally

```
yarn global add git+https://github.com/CivicDataLab/new-component.git

new-component ComponentName
```

This will create a new component directory in `packages/ui/src` with required files for component, test, storybook and styling.

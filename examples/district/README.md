# OPub Mono

A WIP (work in progress) platform to speed up the development of Open Data Dashboards, aimed at simplifying the process of creating and managing data visualizations, enabling users to easily analyze and present complex data in a user-friendly and accessible way.

[OPub UI](https://main--64004009fa0a900a3197549c.chromatic.com/)<br>
[OPub Viz](https://main--64e5d546d7476f1d5b4cfa47.chromatic.com/?path=/story/components-barchart--default/)<br>
[Dashboard](https://opub-www.vercel.app/dashboard)<br>
[Documentation](https://opub-docs.netlify.app)

## What's inside?

This repository, built using [Turborepo](https://github.com/vercel/turbo), utilizes [NPM](https://www.npmjs.com/) as its package manager and contains the following packages and applications:

### Apps and Packages

- `apps/www`: web application built using the [Next.js framework](https://github.com/vercel/next.js/)
- `apps/docs`: documentation site built using [Nextra](https://github.com/shuding/nextra)
- `packages/opub-ui`: a library of reusable React components used in both the web and docs applications.
- `packages/eslint-config-custom`: `eslint` configurations for the eslint tool, including `eslint-config-next` and `eslint-config-prettier`.
- `packages/tsconfig`: configuration files for [TypeScript](https://github.com/microsoft/TypeScript/) used throughout the repository.

### Build

To build all apps and packages, run the following command:

```
cd opub-mono
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd opub-mono
npm run dev
```

### Develop Only Specific Package

To develop only package, let's say UI, run the following command:

```
cd opub-mono
npm run dev --filter opub-ui
```

### New Component

> Currently this might not working for Linux distros

This repo includes a `npm run new-component` module to help create boilerplate for component creation.

```
npm run new-component Button
```

This will create a new component directory in `packages/opub-ui/src` with required files and also export the component in the index.ts

```
components/
┣ Button/
┃ ┣ Button.module.scss/
┃ ┣ Button.stories.tsx/
┃ ┣ Button.test.tsx/
┃ ┣ Button.tsx/
┃ ┣ index.ts/
```

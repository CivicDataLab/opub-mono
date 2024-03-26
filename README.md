# OPub Mono

A WIP (work in progress) platform to speed up the development of Open Data Dashboards, aimed at simplifying the process of creating and managing data visualizations, enabling users to easily analyze and present complex data in a user-friendly and accessible way.

[Stroybook](https://main--64004009fa0a900a3197549c.chromatic.com/) <br>
[Dashboard](https://data-exchange.vercel.app/dashboard)

## What's inside?

This repository, built using [Turborepo](https://github.com/vercel/turbo), utilizes [NPM](https://www.npmjs.com/) as its package manager and contains the following packages and applications:

### Apps and Packages

- `examples`: web applications built using the [Next.js framework](https://github.com/vercel/next.js/) and OPub UI
- `packages/opub-ui`: a library of reusable React components and utility functions
- `packages/create-opub-app`: a CLI tool to quickly spin up a new OPub app in minutes
- `packages/opub-tokens`: a tool to convert Figma variables to Design Tokens

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

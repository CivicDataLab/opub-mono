# OPub UI

Welcome to our OPub UI. This component library is based on a [React](https://react.dev/), designed to provide a collection of reusable UI components for Open Data Platforms.

## Getting Started

To get started with the component library, install the package via [npm](https://www.npmjs.com/):

```bash
npm install opub-ui --save
```

If you prefer [Yarn](https://yarnpkg.com/en/):

```bash
yarn add opub-ui
```

### Usage

The following steps are required before you can start using components:

1. Import the CSS into the project. In the case of Nextjs, it's `_app.tsx` file.

```js
import 'opub-ui/dist/assets/styles.css';
```

2. Once you complete the initial setup, you can import components into your project as needed:

```js
import { Badge, Button, Menu } from 'opub-ui';
```

> When using with NextJs you will need to transpile the packages [More Info](https://nextjs.org/docs/advanced-features/compiler#module-transpilation), add this inside `next.config.js` :
>
> `transpilePackages: ['opub-ui']`

## Components

You can view the complete list of available components on [Storybook](https://main--64004009fa0a900a3197549c.chromatic.com/). The list will grow, and there can be breaking changes at this stage of development.

## Development

The source code is under the `src` directory. The structure is as follows:

```
src/
┣ components/
┣ tokens/
┣ types/
┣ utils/
┣ index.ts
```

### Components

All components reside in this directory. This is the structure we follow for components, e.g., Checkbox:

```
Checkbox/
┣ Checkbox.tsx/
┣ Checkbox.module.scss/
┣ Checkbox.stories.tsx/
┣ Checkbox.test.tsx/
┣ index.ts
```

We use [Vitest](https://github.com/vitest-dev/vitest/) for unit testing and [Storybook](https://github.com/storybookjs/storybook) for developing components in isolation.

As you notice in the directory, we use [Sass Modules](https://sass-lang.com/documentation/modules) for styling.

### Tokens

Although we have a `css` based token file at `assets/tokens.css` which relies on [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). This directory stores those tokens in objects. One use-case of its usage is the `Box` component.

### Types

In this directory, we store the type files of components that aid in type checking and other helpful typescript features.

### Utils

This directory stores helpers, custom hooks, and other utility functions to aid development.

## Bundling

We use [Rollup](https://github.com/rollup) to bundle the `src` for publishing on npm. We also copy the `assets` into the bundled `dist` directory during this step. You can check out the config file at `./rollup.config.mjs.`

We only bundle into [ESM Modules](https://nodejs.org/api/esm.html).

## Contributing

Pull requests are welcome. See the [contribution guidelines](https://github.com/CivicDataLab/opub-mono/blob/main/CONTRIBUTING.md) for more information.

## Credits

Thanks to the following projects for developing in the open and sharing their work with the community:

1. [Shopify Polaris](https://github.dev/Shopify/polaris)
2. [Radix UI](https://github.com/radix-ui/primitives)
3. [React Spectrum](https://github.com/adobe/react-spectrum)
4. [React Hook Form](https://github.com/react-hook-form/react-hook-form)
5. [AriaKit](https://github.com/ariakit/ariakit)
6. [Tabler Icons](https://github.com/tabler/tabler-icons)

## Licenses

The source code is under [MIT License](https://github.com/CivicDataLab/opub-mono/blob/main/LICENSE) unless otherwise stated.
This project uses multiple open-source libraries and projects. You can review the dependencies in the `package.json` file and check their Licenses from their GitHub repo.

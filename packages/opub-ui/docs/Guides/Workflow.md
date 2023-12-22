# Workflows

For OPub, we have a few different workflows that we use to manage our projects. These workflows are designed to help us manage our projects in a way that is consistent and efficient.

## Figma -> Code

### Idea

Since OPub is supposed to be used to create multiple applications, we need to make sure that the design system is consistent across all the applications, while also being flexible enough to allow for customisation. To achieve this, we use Figma to design the components and then use the design tokens to generate the code.

### Design Tokens

We use Figma variables to generate our CSS variables and tokens for Tailwind CSS . This allows us to have a single source of truth for our design tokens.

In future, the process will be fully automated but for now, we have to follow few steps.

> This process is only required when we make changes to the design tokens.

> This requires the figma file to have OPub UI variables.

- Install the [variables2json](https://www.figma.com/community/plugin/1253571037276959291) plugin from Figma community.
- Open the Figma file and go to `Plugins > variables2json > Download (bottom right)`.
- Open the downloaded `JSON` and remove the following from start:

```json
"version": "1.0.4",
"metadata": {},
```

- Copy the remaining JSON and paste it in `/config/tokens/tokens.json`.

- Run the following command to generate the CSS variables and tokens:

```bash
yarn run build:tokens
```

### Style Dictionary

Following the previous steps will generate styling variables in `/styles/tokens` folder. This process is handled by [Style Dictionary](https://amzn.github.io/style-dictionary/). You can find the configuration file in `/config/tokens/geneate.mjs`.

Style Dictrionary is also used to generate the Tailwind CSS config file. You can find the configuration file in `/config/tokens/helpers/tailwind-formattor.js`. The generated tokens are used in `tailwind.config.js`.

## Code -> Storybook

### Idea

Storybook is a tool for UI development. It makes development faster and easier by isolating components. This allows you to work on one component at a time in isolation. You can view the Storybook [here](https://main--64004009fa0a900a3197549c.chromatic.com/).

### Github Actions

We use Github Actions to automatically deploy the Storybook to Chromatic. This allows us to view the changes in the components and also allows us to test the components in different browsers. You can find the configuration file in `.github/workflows/chromatic.yml`.

## Backend -> Frontend

> This is a work in progress and in experimental phase.

In order to sync the backend and frontend, we use [@graphql-codegen/cli](https://the-guild.dev/graphql/codegen) to generate the types. This allows us to have a single source of truth for the backend and frontend.

The configuration file for GraphQL Codegen is in `/config/codegen.ts`. The generated types are in `/gql/generated`.

You can check out the [example](https://github.com/CivicDataLab/opub-mono/blob/main/apps/www/app/%5Blocale%5D/dashboard/dataset/page.tsx) on how to use the generated types.

To sum up,

- In Server Component (`page.tsx`), we use the generated types to pre-fetch the data from the backend.
- We use `react-query` to dehydrate the data.
- In Client Components, we use the `useQuery` hook to fetch the data from the cache.

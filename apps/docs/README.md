# OPub Docs

This is the documentation site for [OPub Mono](https://github.com/CivicDataLab/opub-mono) repo. It's purpose is to provide explaination, guides, and documentation for the platform.

## Getting Started

To get started, you can visit the live site at [this link](https://opub-docs.netlify.app/) or clone the repository and run it locally using the following steps:

1. Clone the repository:

```bash
git clone https://github.com/CivicDataLab/opub-mono.git
```

2. Install dependencies

```bash
cd opub-mono

yarn
```

3. Start the development server:

```bash
turbo dev --filter docs
```

## Add / Edit Content

To edit or add new pages, head over to `pages` directory. Pages need to be in `mdx` format. [Learn more about Markdown](https://nextra.site/docs/guide/markdown).

## Organise

This documentation uses directory layout in `pages` to show them on the site. [Learn more about Organizing Files](https://nextra.site/docs/guide/organize-files)

## Deployment

To deploy the site, you can use a hosting platform such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

For more detailed instructions on deploying the site, refer to the [Nextra documentation](https://nextra.vercel.app/docs).

## Contributing

Contributions to the project are welcome! To contribute, simply fork the repository, make your changes, and submit a pull request.

For more information on contributing to the project, refer to the [CONTRIBUTING.md](../../CONTRIBUTING.md) file.

## License

This project is licensed under the MIT license. For more information, refer to the [LICENSE](LICENSE) file.

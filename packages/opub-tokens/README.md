# OPub Tokens

A tool to convert Figma variables to Design Tokens. It can convert the JSON exported from Figma to CSS Variables and Tailwind theme files.

## Installation

```bash
npm install opub-tokens
```

Add a script to your `package.json`:

```json
{
	"scripts": {
		"style": "opub-tokens; echo \"\\033[33mRunning Prettier\"; prettier --write **/tailwind/*.js **/_variables.css"
	}
}
```

This will run the `opub-tokens` command and then run Prettier to format the generated files.

## Usage

1. First you need to export the Figma file as JSON. You can do this by using [variables2json](https://www.figma.com/community/plugin/1253571037276959291) Figma plugin.

2. Create a `opub.config.js` file at the root of the project and add the source and destination paths:

```js
module.exports = {
	tokens: {
		input: 'styles/tokens.json',
		output: 'styles/tokens',
	},
}
```

3. Run the script:

```bash
npm run style
```

This will generate the CSS variables and Tailwind theme files in the specified output folder.

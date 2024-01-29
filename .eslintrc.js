module.exports = {
	root: true,
	settings: {
		next: {
			rootDir: ['apps/*/'],
		},
	},
	env: {
		browser: true,
		jest: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'es2022',
	},
	extends: [
		'turbo',
		'prettier',
		'eslint:recommended',
		'plugin:react/jsx-runtime',
	],

	rules: {
		'@next/next/no-img-element': 'off',
		'@next/next/no-html-link-for-pages': 'off',
		'react/jsx-key': 'off',
		'react/display-name': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'off',
		'no-undef': 'off',
		'no-redeclare': ['error', { builtinGlobals: false }],
	},
}

module.exports = {
	globals: {
		React: true,
		JSX: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'es2022',
	},
	extends: ['eslint:recommended', 'plugin:react/jsx-runtime', 'prettier'],

	rules: {
		'react/display-name': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'off',
		'no-undef': 'off',
		'no-useless-escape': 'off',
		'no-redeclare': ['error', { builtinGlobals: false }],
	},
	ignorePatterns: ['node_modules/', 'dist/'],
}

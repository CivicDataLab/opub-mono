module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'next',
		'prettier',
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn'],
		'@typescript-eslint/no-explicit-any': ['off'],
		'react/display-name': 'off',
		'@next/next/no-html-link-for-pages': 'off',
		'prefer-const': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@next/next/no-img-element': 'off',
	},
	ignorePatterns: ['**/generated/**/*.ts', 'node_modules/', 'dist/'],
}

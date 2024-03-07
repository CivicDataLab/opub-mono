import cssFormattor from './helpers/css-formattor.js'
import twFormat from './helpers/tailwind-formattor.js'
import fs from 'fs-extra'

function loadJSON(path) {
	return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
}

const json = loadJSON('./tokens.json')
export default {
	format: {
		twFormat,
		cssFormattor,
	},
	tokens: json.collections,
	platforms: {
		css: {
			transformGroup: 'css',
			buildPath: 'dist/',
			files: [
				{
					destination: '_variables.css',
					format: 'cssFormattor',
				},
			],
		},
		tailwind: {
			transformGroup: 'js',
			buildPath: 'dist/tailwind/',
			files: [
				{
					destination: 'space.js',
					format: 'twFormat',
					options: {
						category: 'Spacing / Numericals',
						trimName: true,
					},
				},
				{
					destination: 'border-radius.js',
					format: 'twFormat',
					options: {
						type: 'radius',
						category: 'Borders',
						trimName: true,
					},
				},
				{
					destination: 'border-width.js',
					format: 'twFormat',
					options: {
						type: 'width',
						category: 'Borders',
						trimName: true,
					},
				},
				{
					destination: 'box-shadow.js',
					format: 'twFormat',
					options: {
						category: 'Effects',
						trimName: true,
						trimLength: 2,
					},
				},
				{
					destination: 'color.js',
					format: 'twFormat',
					options: {
						category: 'Colors',
					},
				},
			],
		},
	},
}

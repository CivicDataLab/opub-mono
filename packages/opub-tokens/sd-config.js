import fs from 'fs'
import path from 'path'
import cssFormattor from './helpers/css-formattor.js'
import twFormat from './helpers/tailwind-formattor.js'
import { extraVariables } from './helpers/constants.js'

function loadJSON(input) {
	const jsonPath = path.resolve(process.cwd(), input)
	return JSON.parse(fs.readFileSync(new URL(jsonPath, import.meta.url)))
}

// load the config from root of the package
const configPath = path.resolve(process.cwd(), 'opub.config.js')

async function getConfigAndJson() {
	if (fs.existsSync(configPath)) {
		try {
			const module = await import(configPath)
			const config = module.default
			const json = loadJSON(`./${config.tokens.input}`)
			return { config, json }
		} catch (err) {
			console.error('Error loading config:', err)
			process.exit(1)
		}
	} else {
		console.error('No config found')
		process.exit(1)
	}
}

let exportObject = {
	format: {
		cssFormattor,
		twFormat,
	},
	tokens: null,
	platforms: {
		css: {
			transformGroup: 'css',
			buildPath: null,
			files: [
				{
					destination: '_variables.css',
					format: 'cssFormattor',
				},
			],
		},
		tailwind: {
			transformGroup: 'js',
			buildPath: null,
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
				{
					destination: 'z-index.js',
					format: 'twFormat',
					options: {
						category: 'Z Index',
					},
				},
				{
					destination: 'duration.js',
					format: 'twFormat',
					options: {
						category: 'Duration',
					},
				},
				{
					destination: 'ease-function.js',
					format: 'twFormat',
					options: {
						category: 'Ease',
					},
				},
				{
					destination: 'font-size.js',
					format: 'twFormat',
					options: {
						category: 'Font Size',
					},
				},
				{
					destination: 'font-weight.js',
					format: 'twFormat',
					options: {
						category: 'Font Weight',
					},
				},
				{
					destination: 'line-height.js',
					format: 'twFormat',
					options: {
						category: 'Font Line Height',
					},
				},
			],
		},
	},
}

async function initialize() {
	const { config, json } = await getConfigAndJson()

	exportObject.tokens = [...json.collections, ...extraVariables]
	exportObject.platforms.css.buildPath = `${config.tokens.output}/`
	exportObject.platforms.tailwind.buildPath = `${config.tokens.output}/tailwind/`

	return exportObject
}

export default initialize

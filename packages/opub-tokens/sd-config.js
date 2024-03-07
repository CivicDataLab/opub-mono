import cssFormattor from './helpers/css-formattor.js'
import twFormat from './helpers/tailwind-formattor.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function loadJSON(path) {
	return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
}

// load the config from root of the package
const configPath = path.resolve(__dirname, 'opub.config.js')

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
		twFormat,
		cssFormattor,
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
			],
		},
	},
}

async function initialize() {
	const { config, json } = await getConfigAndJson()

	exportObject.tokens = json.collections
	exportObject.platforms.css.buildPath = `${config.tokens.output}/`
	exportObject.platforms.tailwind.buildPath = `${config.tokens.output}/tailwind/`

	return exportObject
}

export default initialize

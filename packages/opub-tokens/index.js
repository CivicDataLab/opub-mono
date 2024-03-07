import sd from 'style-dictionary'
import initialize from './sd-config.js'

async function main() {
	const config = await initialize()
	sd.extend(config).buildAllPlatforms()
}

main()

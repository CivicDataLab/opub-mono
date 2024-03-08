const fs = require('fs').promises

const configPaths = {
	eslint: 'config-eslint/next.js',
	prettier: 'config-prettier/index.js',
	tsconfig: 'config-ts/example.json',
}

const pastePath = {
	eslint: '.eslintrc.js',
	prettier: '.prettierrc.js',
	tsconfig: 'tsconfig.json',
}

const copyConfig = async (config) => {
	const base = process.cwd()
	const source = `${base}/packages/${configPaths[config]}`

	// get all directories in base/examples
	await fs.readdir(`${base}/examples`).then((dirs) => {
		dirs.forEach((dir) => {
			const destination = `${base}/examples/${dir}/${pastePath[config]}`
			fs.copyFile(source, destination)
			console.log(`${config} copied to ${dir}`)
		})
	})
}

const syncConfig = async () => {
	await Promise.all(Object.keys(configPaths).map(copyConfig))
}

syncConfig()

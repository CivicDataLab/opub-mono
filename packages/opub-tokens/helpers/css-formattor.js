import { extraVariables } from './constants.js'
import effectConvert from './effect-convert.js'

// format `design/token` to `--design-token`
function nameFormat(name) {
	return `--${name.toLowerCase().split('/').join('-')}`
}

const formattor = function ({ dictionary }) {
	let families = ':root { \n'
	Object.values(dictionary.tokens).map((collection) => {
		if (['Typography', 'Grids'].includes(collection.name)) return

		collection.modes[0].variables.forEach((variable) => {
			let name = nameFormat(variable.name)
			let value
			if (variable.type === 'effect') {
				value = effectConvert(variable.value.effects)
			} else {
				// if the value is based on another design token
				if (variable['isAlias'] === true) {
					value = `var(${nameFormat(variable.value.name)})`
				} else {
					// if it's a fixed value
					const val = variable.value
					if (variable.type === 'number') {
						value = `${val}px`
					} else {
						value = val
					}
				}
			}

			families += `  ${name}: ${value};\n`
		})
		families += '\n'
	})
	families += extraVariables
	families += '}\n'

	return families
}

export default formattor

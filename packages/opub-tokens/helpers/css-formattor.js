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
				// effect is a bit complex, so we need to convert it separately
				value = effectConvert(variable.value.effects)
			} else {
				// if the value is based on another design token
				if (variable['isAlias'] === true) {
					value = `var(${nameFormat(variable.value.name)})`
				} else {
					// if it's a fixed value
					value = typeFormat(variable.value, variable.type)
				}
			}

			families += `  ${name}: ${value};\n`
		})
		families += '\n'
	})
	families += '}\n'

	return families
}

export default formattor

export function typeFormat(val, type) {
	switch (type) {
		case 'number':
			return `${val}px`
		case 'index':
			return val
		case 'duration':
			return `${val}ms`
		case 'ease':
			return `cubic-bezier(${val.join(', ')})`
		case 'font':
			return `${val}rem`
		default:
			return val
	}
}

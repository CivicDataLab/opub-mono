import puppeteerProd from 'puppeteer-core'
import puppeteerDev from 'puppeteer'

export default process.env.NODE_ENV === 'production'
	? puppeteerProd
	: puppeteerDev

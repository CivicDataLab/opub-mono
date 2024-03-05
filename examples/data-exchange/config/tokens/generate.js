const StyleDictionary = require('style-dictionary');
const config = require('./sd-config.js');

StyleDictionary.extend(config).buildAllPlatforms();

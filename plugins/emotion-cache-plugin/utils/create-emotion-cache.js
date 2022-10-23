const createCache = require('@emotion/cache');
const convertUnitsPlugin = require('./stylus-plugin-convert');

module.exports = () => createCache.default({
    key: 'audal',
    stylisPlugins: process.env.NODE_ENV === 'production' ? [
        convertUnitsPlugin(),
        // createExtraScopePlugin(`.${uniqueId}`),
    ] : [],
});

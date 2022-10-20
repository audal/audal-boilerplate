const createCache = require("@emotion/cache");
const createExtraScopePlugin = require("../utils/stylus-plugin");
const convertUnitsPlugin = require("../utils/stylus-plugin-convert");
module.exports = (uniqueId) => createCache.default({
    key: "audal",
    stylisPlugins: [
        convertUnitsPlugin(),
        //createExtraScopePlugin(`.${uniqueId}`),
    ]
})

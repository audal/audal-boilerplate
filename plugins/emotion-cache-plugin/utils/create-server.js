const React = require("react");
const { CacheProvider } = require('@emotion/react')
const { ServerLocation } = require("@reach/router")
const { renderToString } = require('react-dom/server')
const createEmotionServer = require('@emotion/server/create-instance')
const createEmotionCache = require('./create-emotion-cache')

module.exports = (App, uniqueId) => () => {

    const inline = (cache) => React.createElement(
        ServerLocation
        , {
            url: "",
            children: React.createElement(
                CacheProvider,
                {
                    value: cache,
                    children: React.createElement(App, {})
                }
            )
        }
    )

    const cache = createEmotionCache(uniqueId)
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer.default(cache)

    const html = renderToString(inline(cache))

    const chunks = extractCriticalToChunks(html)
    const styles = constructStyleTagsFromChunks(chunks)

    return styles + `<div class="${uniqueId}">${html}</div>`
}

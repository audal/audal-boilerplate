const React = require("react");
const ReactDOM = require("react-dom");
const {
    createHistory,
    LocationProvider
} = require("@reach/router")
const { CacheProvider } = require('@emotion/react')
const createEmotionCache = require('./create-emotion-cache')
module.exports = (App, uniqueId) => {
    let history = createHistory(window)
    const cache = createEmotionCache(uniqueId)
    const root = ReactDOM.createRoot(document.querySelector(`.${uniqueId}`));
    root.render(React.createElement(LocationProvider, {
        history,
        children: [
            React.createElement(
                CacheProvider,
                { value: cache, children: [
                        React.createElement(App, {}),
                    ] }
            )
        ]
    }))
}

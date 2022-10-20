import * as React from 'react';
import { renderToString } from 'react-dom/server';

const { CacheProvider } = require('@emotion/react');
const createEmotionServer = require('@emotion/server/create-instance');
const createEmotionCache = require('./utils/create-emotion-cache');

export const replaceRenderer = ({
    replaceBodyHTMLString,
    bodyComponent,
    setHeadComponents,
}) => {
    const cache = createEmotionCache('__audal_labs');
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer.default(cache);
    const html = renderToString(React.createElement(
        CacheProvider,
        {
            value: cache,
            children: bodyComponent,
        },
    ));

    const chunks = extractCriticalToChunks(html);
    const styles = constructStyleTagsFromChunks(chunks);

    setHeadComponents([
        <style
            key="emotion"
            dangerouslySetInnerHTML={{
                __html: styles,
            }}
        />,
    ]);
    replaceBodyHTMLString(html);
};

import { CacheProvider } from '@emotion/react';
import * as React from 'react';

const createEmotionCache = require('./utils/create-emotion-cache');

const cache = createEmotionCache('__audal_labs');
// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <CacheProvider value={cache}>{element}</CacheProvider>
);

export const onClientEntry = () => {
	console.log("%cdeveloped by audal labs. 💅💻", "background-color: #251ad4; color: white; padding: 5px; font-weight: 600; border-radius: 4px; font-family: sans-serif;", "https://audallabs.com")
}

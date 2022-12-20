import React from 'react';
import sortBreakpoints from './sort-breakpoints';

interface UseBreakpointValueProps {
    items: { query: string, value: any }[]
    defaultValue: any
    desktopFirst: boolean
}

const useBreakpointValue = ({ items, defaultValue, desktopFirst }: UseBreakpointValueProps) => {
    const [values, setValues] = React.useState<{ [key: string]: { query: string, match: boolean } }>({});

    const reparsedPoints = items.map(x => ({
        ...x,
        query: x.query.replace('@media ', ''),
        originalQuery: x.query,
    }));

    React.useEffect(() => {
        const mql = reparsedPoints.map(({ query }) => window.matchMedia(query));

        const firstVals = Object.fromEntries(mql.map(x => [x.media, { query: x.media, match: x.matches }]));

        setValues(firstVals);

        const handler = (evt: MediaQueryListEvent) => {
            setValues((e: any) => ({
                ...e,
                [evt.media]: { query: evt.media, match: evt.matches },
            }));
        };

        mql.forEach((mql) => {
            if (typeof mql.addListener === 'function') {
                mql.addListener(handler);
            } else {
                mql.addEventListener('change', handler);
            }
        });

        return () => {
            mql.forEach((mql) => {
                if (typeof mql.removeListener === 'function') {
                    mql.removeListener(handler);
                } else {
                    mql.removeEventListener('change', handler);
                }
            });
        };
    }, []);

    return (() => {
        const sorted = sortBreakpoints(values, desktopFirst);
        const foundMatch = sorted.reverse().find(x => x[1].match === true);
        if (foundMatch) {
            const point = reparsedPoints.find(x => x.query === foundMatch[0]);
            if (point) {
                return point.value;
            }
        }
        return defaultValue;
    })();
};

export default useBreakpointValue;

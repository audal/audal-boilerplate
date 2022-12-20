import React from 'react';
import { useGridContext } from './context';

type Container = HtmlPropsNoRef<HTMLDivElement> & {
    removeAt?: string
};

export const generateContainerMaxWidth = (query: string, maxDesignWidth: number): string => {
    const breakNum = query.replace(/\D/g, '');
    if (breakNum) {
        return `${parseFloat(breakNum) - 300}px`;
    }
    return `${maxDesignWidth}px`;
};

const Container = ({ removeAt, ...props }: Container): JSX.Element => {
    const { breakpoints: outerBreakpoints, maxWidth } = useGridContext();

    const css = React.useMemo(() => {
        let hasRemoved = false;
        return {
            margin: 'auto',
            //maxWidth: `calc(${maxWidth}px + 20vw)`,
            ...Object.fromEntries(Object.entries(outerBreakpoints).map(([breakpointName, { query }]) => {
                if (hasRemoved || breakpointName === removeAt) {
                    hasRemoved = true;
                    return [query, {
                        maxWidth: '100%',
                        paddingLeft: '0',
                        paddingRight: '0',
                    }];
                }
                return [query, {
                    width: '100%',
                    paddingLeft: '10vw',
                    paddingRight: '10vw',
                    '@media (max-width: 767px)': {
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    },
                }];
            })),
        };
    }, [maxWidth, outerBreakpoints, removeAt]);

    return (
        <div
            css={css}
            {...props}
        />
    );
};

export default Container;

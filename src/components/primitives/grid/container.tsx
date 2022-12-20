import React from 'react';
import { useGridContext } from './context';
import { useSplitColumn } from './split-column-context';

type Container = HtmlPropsNoRef<HTMLDivElement> & {
    removeAt?: string
    applyAt?: string
    paddingTop?: 'full'|'half'|'quarter'|'none' | { [key: string]: 'full'|'half'|'quarter'|'none' }
    paddingBottom?: 'full'|'half'|'quarter'|'none' | { [key: string]: 'full'|'half'|'quarter'|'none' }
};

export const generateContainerMaxWidth = (query: string, maxDesignWidth: number): string => {
    return `100%`;
    const breakNum = query.replace(/\D/g, '');
    if (breakNum) {
        return `${parseFloat(breakNum) - 300}px`;
    }
    return `${maxDesignWidth}px`;
};

const getMarginDesktop = (size?: 'full'|'half'|'quarter'|'none') => {
    switch (size) {
        case 'full':
            return '120px';
        case 'half':
            return '60px';
        case 'quarter':
            return '30px';
        case 'none':
            return '0px';
        default:
            return '';
    }
};

const getMarginMobile = (size?: 'full'|'half'|'quarter'|'none') => {
    switch (size) {
        case 'full':
            return '80px';
        case 'half':
            return '40px';
        case 'quarter':
            return '20px';
        case 'none':
            return '0px';
        default:
            return '';
    }
};

const Container = ({ removeAt, paddingTop, paddingBottom, applyAt, ...props }: Container): JSX.Element => {
    const { breakpoints: outerBreakpoints, maxWidth } = useGridContext();
    const cols = useSplitColumn();

    const parsedPaddings = {
        marginTop: getMarginDesktop(typeof paddingTop === 'string' ? paddingTop : paddingTop?.dt),
        marginBottom: getMarginDesktop(typeof paddingBottom === 'string' ? paddingBottom : paddingBottom?.dt),
        '@media screen and (max-width: 767px)': {
            marginTop: getMarginMobile(typeof paddingTop === 'string' ? paddingTop : paddingTop?.mb),
            marginBottom: getMarginMobile(typeof paddingBottom === 'string' ? paddingBottom : paddingBottom?.mb),
        },
    };

    const css = React.useMemo(() => {
        let hasRemoved = false;
        let hasApplied = false;

        return {
            margin: 'auto',
            // maxWidth: `calc(${maxWidth}px + 20vw)`,
            ...parsedPaddings,
            ...Object.fromEntries(Object.entries(outerBreakpoints).map(([breakpointName, { query }]) => {
                if (cols && !query.includes('1200px')) {
                    return [query, {
                        maxWidth: '100%',
                        width: '100%',
                        paddingLeft: '0',
                        paddingRight: '0',
                    }];
                }
                if (hasRemoved || breakpointName === removeAt) {
                    hasRemoved = true;
                    return [query, {
                        maxWidth: '100%',
                        width: '100%',
                        paddingLeft: '0',
                        paddingRight: '0',
                    }];
                }
                if (hasApplied || breakpointName === applyAt) {
                    hasApplied = true;
                    return [query, {
                        width: '100%',
                        // paddingLeft: '10vw',
                        // paddingRight: '10vw',
                        maxWidth: '1440px',
                        paddingLeft: '32px',
                        paddingRight: '32px',
                        '@media screen and (max-width: 767px)': {
                            // paddingLeft: '5vw',
                            // paddingRight: '5vw',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                        },
                    }];
                }

                if (applyAt && !hasApplied) {
                    return [query, {
                        width: '100%',
                        maxWidth: '100%',
                        paddingLeft: '0',
                        paddingRight: '0',
                    }];
                }

                return [query, {
                    width: '100%',
                    // paddingLeft: '10vw',
                    // paddingRight: '10vw',
                    maxWidth: '1440px',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    '@media screen and (max-width: 767px)': {
                        // paddingLeft: '5vw',
                        // paddingRight: '5vw',
                        paddingLeft: '16px',
                        paddingRight: '16px',
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

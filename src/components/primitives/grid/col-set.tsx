import React from 'react';
import { useGridContext } from './context';

interface ColSet extends HtmlPropsNoRef<HTMLDivElement> {
    breakpoints: {
        [key: string]: { between: number }
    }
}

const ColSet = ({ breakpoints, ...props }: ColSet): JSX.Element => {
    const { breakpoints: outerBreakpoints } = useGridContext();

    return (
        <div
            css={{
                ...Object.fromEntries(Object.entries(breakpoints).map(([selected, { between }]) => {
                    const { query } = outerBreakpoints[selected];
                    return [query, {
                        '&>*:not(style)~*:not(style)': {
                            marginLeft: `${between}px`,
                        },
                    }];
                })),
                display: 'flex',
                width: '100%',
                margin: 'auto',
            }}
            {...props}
        />
    );
};

export default ColSet;

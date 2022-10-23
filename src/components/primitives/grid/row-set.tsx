import React from 'react';
import { useGridContext } from './context';

interface RowSet extends HtmlPropsNoRef<HTMLDivElement> {
    breakpoints: {
        [key: string]: { between: number }
    }
}

const RowSet = ({ breakpoints, ...props }: RowSet): JSX.Element => {
    const { breakpoints: outerBreakpoints } = useGridContext();

    return (
        <div
            css={{
                ...Object.fromEntries(Object.entries(breakpoints).map(([selected, { between }]) => {
                    const { query } = outerBreakpoints[selected];
                    return [query, {
                        '&>*:not(style)~*:not(style)': {
                            marginTop: `${between}px`,
                        },
                    }];
                })),
                width: '100%',
                margin: 'auto',
            }}
            {...props}
        />
    );
};

export default RowSet;

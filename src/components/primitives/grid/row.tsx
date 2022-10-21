import React from 'react';
import { useGridContext } from './context';

const Row = (props: HTMLPropsNoRef<HTMLDivElement>): JSX.Element => {
    const { breakpoints } = useGridContext();

    return (
        <div
            css={{
                ...Object.fromEntries(Object.values(breakpoints).map(({ query, columns, gap }) => [query, {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridColumnGap: `${gap}px`,
                }])),
                width: '100%',
                margin: 'auto',
                position: 'relative',
            }}
            {...props}
        />
    );
};

export default Row;

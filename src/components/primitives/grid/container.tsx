import React from 'react';
import { useGridContext } from './context';

type RowSet = HTMLPropsNoRef<HTMLDivElement>;

const Container = (props: RowSet): JSX.Element => {
    const { breakpoints: outerBreakpoints, maxWidth } = useGridContext();

    return (
        <div
            css={{
                ...Object.fromEntries(Object.values(outerBreakpoints).map(({ query }) => {
                    const breakNum = query.replace(/\D/g, '');
                    if (breakNum) {
                        return [query, {
                            maxWidth: `${parseFloat(breakNum) - 300}px`,
                        }];
                    }
                    return [query, {}];
                })),
                width: '90%',
                margin: 'auto',
                maxWidth: `${maxWidth}px`,
            }}
            {...props}
        />
    );
};

export default Container;

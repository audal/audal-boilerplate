import React from 'react';
import { useGridContext } from './context';

interface Col extends HTMLPropsNoRef<HTMLDivElement> {
    breakpoints: {
        [key: string]: { start?: number, span: number, justify?: 'between' | 'around' | 'center' | 'start' | 'end', align?: 'between' | 'around' | 'center' | 'start' | 'end', dir?: 'column' | 'row', leftGap?: 'half' | 'none' | 'full', rightGap?: 'half' | 'none' | 'full' }
    },
}

const flexMap = {
    between: 'space-between',
    around: 'space-around',
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
};

const getGap = (gap: number, property?: 'half' | 'full' | 'none'): number => {
    if (property === 'half') return gap / 2;
    if (property === 'none') return gap;
    return 0;
};

const getColumnSize = (columns: number, span?: number, start?: number): string => {
    if (typeof span === 'number' && typeof start === 'number') {
        return `${start + 1} / span ${span}`;
    }
    if (typeof span === 'number') {
        if (span < columns) {
            return `span ${span}`;
        }
    }
    return `span ${columns}`;
};

const Col = ({ breakpoints, ...props }: Col): JSX.Element => {
    const { breakpoints: outerBreakpoints } = useGridContext();

    return (
        <div
            css={Object.fromEntries(Object.entries(breakpoints).map(([selected,
                {
                    start, span, justify, align, dir, leftGap, rightGap,
                }]) => {
                const { query, gap, columns } = outerBreakpoints[selected];
                const lG = getGap(gap, leftGap);
                const rG = getGap(gap, rightGap);
                return [query, {
                    gridColumn: getColumnSize(columns, span, start),
                    justifyContent: justify && flexMap[justify],
                    alignItems: align && flexMap[align],
                    display: 'flex',
                    flexDirection: dir || 'column',
                    marginLeft: lG && `-${lG}px`,
                    marginRight: rG && `-${rG}px`,
                }];
            }))}
            {...props}
        />
    );
};

export default Col;

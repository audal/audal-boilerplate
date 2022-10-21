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

const getGap = (columns: number, gap: number, span?: number, start?: number, property?: 'half' | 'full' | 'none'): number => {
    if (typeof span === 'number' && span > columns) {
        return 0;
    }
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
    const { sortedBreakpoints: outerBreakpoints } = useGridContext();

    const css = React.useMemo(() => {
        let lastBreakpoint = {};
        return Object.fromEntries(outerBreakpoints.map(([selected, { query, gap, columns }]) => {
            const {
                start, span, justify, align, dir, leftGap, rightGap,
            } = breakpoints[selected] || lastBreakpoint;

            if (breakpoints[selected]) {
                lastBreakpoint = breakpoints[selected];
            }

            const lG = getGap(columns, gap, span, start, leftGap);
            const rG = getGap(columns, gap, span, start, rightGap);
            return [query, {
                gridColumn: getColumnSize(columns, span, start),
                justifyContent: justify && flexMap[justify],
                alignItems: align && flexMap[align],
                display: 'flex',
                flexDirection: dir || 'column',
                marginInlineStart: lG && `-${lG}px`,
                marginInlineEnd: rG && `-${rG}px`,
            }];
        }));
    }, [breakpoints, outerBreakpoints]);

    return (
        <div
            css={css}
            {...props}
        />
    );
};

export default Col;
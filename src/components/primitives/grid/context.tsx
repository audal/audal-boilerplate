import React from 'react';

const GridDebug = React.lazy(() => import('./grid-debug'));

interface GridContext {
    breakpoints: { [key: string]: { query: string, columns: number, gap: number } },
    sortedBreakpoints: [string, { query: string, columns: number, gap: number }][],
    maxWidth: number
    desktopFirst: boolean
}

const GridContext = React.createContext<GridContext>({
    breakpoints: {},
    sortedBreakpoints: [],
    maxWidth: 1440,
    desktopFirst: true,
});

interface GridContextProvider extends Omit<GridContext, 'sortedBreakpoints'> {
    children: React.ReactNode
}

export const getBaseNum = (number: number, desktopFirst: boolean): number => {
    if (Number.isNaN(number)) {
        if (desktopFirst) {
            return 1000000;
        }
        return 0;
    }
    return number;
};

const GridContextProvider = ({ children, breakpoints, maxWidth, desktopFirst }: GridContextProvider): JSX.Element => {
    const value = React.useMemo(() => {
        const sortedBreakpoints = Object.entries(breakpoints).sort((x, y) => {
            const breakNumX = getBaseNum(parseFloat(x[1].query.replace(/\D/g, '')), desktopFirst);
            const breakNumY = getBaseNum(parseFloat(y[1].query.replace(/\D/g, '')), desktopFirst);
            if (desktopFirst) {
                return breakNumY - breakNumX;
            }
            return breakNumX - breakNumY;
        });
        return { breakpoints, sortedBreakpoints, maxWidth, desktopFirst };
    }, [breakpoints, desktopFirst, maxWidth]);

    return (
        <GridContext.Provider value={value}>
            {children}
            {/*{process.env.NODE_ENV === 'development' && (*/}
                <React.Suspense fallback={<div>Loading...</div>}>
                    <GridDebug />
                </React.Suspense>
            {/*})}*/}
        </GridContext.Provider>
    );
};

export default GridContextProvider;

export const useGridContext = (): GridContext => {
    const ctx = React.useContext(GridContext);
    if (!ctx) {
        throw new Error('Must be inside a GridContext');
    }
    return ctx;
};

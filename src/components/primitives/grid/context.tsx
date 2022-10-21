import React from 'react';

interface GridContext {
    breakpoints: { [key: string]: { query: string, columns: number, gap: number } },
    maxWidth: number
}

const GridContext = React.createContext<GridContext>({ breakpoints: {}, maxWidth: 1440 });

interface GridContextProvider extends GridContext {
    children: React.ReactNode
}

const GridContextProvider = ({ children, breakpoints, maxWidth }: GridContextProvider): JSX.Element => {
    const value = React.useMemo(() => ({ breakpoints, maxWidth }), [breakpoints, maxWidth]);

    return (
        <GridContext.Provider value={value}>
            {children}
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

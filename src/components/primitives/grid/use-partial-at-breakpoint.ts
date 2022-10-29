import { useGridContext } from './context';

const usePartialAtBreakpoint = (
    breakpoints: string | { [key: string]: string },
    styleObject: { [key: string]: any },
    pick = '',
): { [key: string]: any } => {
    const { breakpoints: gridBreakpoints } = useGridContext();

    if (typeof breakpoints === 'string') {
        return { '@media screen': pick ? styleObject[breakpoints][pick] : styleObject[breakpoints] };
    }
    return Object.fromEntries(Object.entries(breakpoints).map(([breakpoint, indexer]) => {
        const mediaQuery = gridBreakpoints[breakpoint].query;

        return [mediaQuery, pick ? styleObject[indexer][pick] : styleObject[indexer]];
    }));
};

export default usePartialAtBreakpoint;

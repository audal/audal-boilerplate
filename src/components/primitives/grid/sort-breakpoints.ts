import { getBaseNum } from './context';

const sortBreakpoints = (breakpoints: { [key: string]: { query: string, [key: string]: any } }, desktopFirst: boolean):
[string, { query: string, [key: string]: any }][] => Object.entries(breakpoints).sort((x, y) => {
    const breakNumX = getBaseNum(parseFloat(x[1].query.replace(/\D/g, '')), desktopFirst);
    const breakNumY = getBaseNum(parseFloat(y[1].query.replace(/\D/g, '')), desktopFirst);
    if (desktopFirst) {
        return breakNumY - breakNumX;
    }
    return breakNumX - breakNumY;
});

export default sortBreakpoints;

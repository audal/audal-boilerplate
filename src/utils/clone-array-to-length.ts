import React from 'react';

export default function cloneArrayToLength<T = never>(numOfEls: number, initialArray: T[] = []): T[] {
    return [].concat(...Array(numOfEls))
        .reduce((a: T[], _v: T, idx: number) => [...a, initialArray[idx % initialArray.length]], []);
}

/* Use this instead for React Component cloning so there's no array key errors */
export function cloneArrayToLengthComponents(
    numOfEls: number,
    initialArray: React.ReactElement[] = [],
): React.ReactElement[] {
    const els = []
        .concat(...Array(numOfEls))
        .reduce((a: React.ReactElement[], _v: never, idx: number) => [...a,
            initialArray[idx % initialArray.length]], []);

    // eslint-disable-next-line react/no-array-index-key
    return els.map((x, idx) => React.cloneElement(x, { key: idx }));
}

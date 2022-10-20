import React from 'react';

export default function cloneArrayToLength(numOfEls: number, initialArray: unknown[] = []): any[] {
    return [].concat(...Array(numOfEls)).reduce((a: unknown[], _v: never, idx: number) => [...a, initialArray[idx % initialArray.length]], []);
}

/* Use this instead for React Component cloning so there's no array key errors */
export function cloneArrayToLengthComponents(
    numOfEls: number,
    initialArray: React.ReactElement[] = [],
): React.ReactElement[] {
    const els = []
        .concat(...Array(numOfEls))
        .reduce((a: React.ReactElement[], _v: never, idx: number) => [...a, initialArray[idx % initialArray.length]], []);

    return els.map((x, idx) => React.cloneElement(x, { key: idx }));
}

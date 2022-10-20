import React, { FunctionComponent } from 'react';
import deepEqual from 'fast-deep-equal';

/*
 * React.memo with a pre-defined props diff-er.
 * Less expensive to run a deep object diff on props than it is
 * to have GSAP re-draw an animation (and get it wrong if the elements are nested)
 * every time a parent element (likely a context) is re-rendered.
 * Pretty much only used on Slices, where the objects are really not that complex/large,
 * but just slightly outside the purview of shallow equal.
 * */

export function deepMemo<T>(Component: FunctionComponent<T>) {
    return React.memo(Component, (prev, next) => {
        const clonedPrev = { ...prev };
        const clonedNext = { ...next };
        // @ts-ignore
        delete clonedPrev.children;
        // @ts-ignore
        delete clonedNext.children;
        return deepEqual(clonedPrev, clonedNext);
    });
}

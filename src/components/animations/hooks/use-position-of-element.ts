import React from 'react';
import useResizeObserver from '@react-hook/resize-observer';

export interface ElementPositionRect extends DOMRect {
    pageTop: number;
    pageBottom: number;
}

const usePositionOfElement = (
    ref: React.RefObject<HTMLElement>,
): ElementPositionRect => {
    const [pos, setPos] = React.useState<Omit<ElementPositionRect, 'toJSON'>>({
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        pageBottom: 0,
        pageTop: 0,
    });

    const computeSize = React.useCallback(() => {
        if (ref.current) {
            const {
                top,
                right,
                bottom,
                left,
                width,
                height,
                x,
                y,
            } = ref.current.getBoundingClientRect();
            const pageTop = window.scrollY + top;
            const pageBottom = pageTop + height;
            setPos({
                top,
                right,
                bottom,
                left,
                width,
                height,
                x,
                y,
                pageTop,
                pageBottom,
            });
        }
    }, [ref]);

    React.useEffect(() => {
        computeSize();
    }, [ref, computeSize]);

    useResizeObserver(ref, () => computeSize());

    return {
        toJSON: () => pos,
        ...pos,
    };
};

export default usePositionOfElement;

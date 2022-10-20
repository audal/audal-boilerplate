import React from 'react';

export interface ElementPositionRect extends DOMRect {
    pageTop: number;
    pageBottom: number;
}

export const getPositionOfElement = (
    ref: React.RefObject<HTMLElement>,
): ElementPositionRect | undefined => {
    if (ref.current) {
        const {
            top, right, bottom, left, width, height, x, y,
        } = ref.current.getBoundingClientRect();

        const pageTop = window.scrollY + top;
        const pageBottom = pageTop + height;

        const returnable = {
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
        };

        return {
            toJSON: () => returnable,
            ...returnable,
        };
    }
};

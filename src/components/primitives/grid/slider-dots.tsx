import React from 'react';
// eslint-disable-next-line import/no-cycle
import { useCarouselContext } from './row';
import ControlHandleBulletPoints from '../control-handles/bullet-points';

const SliderDots = (): JSX.Element | null => {
    const carouselContext = useCarouselContext();

    if (carouselContext) {
        const { currentSlide, slideLength, setCurrentSlide } = carouselContext;
        return (
            <ControlHandleBulletPoints currentSlide={currentSlide} length={slideLength} onClick={setCurrentSlide} />
        );
    }

    return null;
};

export default SliderDots;

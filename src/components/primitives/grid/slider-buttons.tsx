import React from 'react';
// eslint-disable-next-line import/no-cycle
import { useCarouselContext } from './row';
import ControlHandleArrows from '../control-handles/arrows';

const SliderButtons = (): JSX.Element | null => {
    const carouselContext = useCarouselContext();

    if (carouselContext) {
        const { currentSlide, slideLength, setCurrentSlide } = carouselContext;
        return (
            <ControlHandleArrows
                hasLeft={currentSlide !== 0}
                onClickLeft={() => setCurrentSlide(currentSlide - 1)}
                hasRight={currentSlide !== slideLength - 1}
                onClickRight={() => setCurrentSlide(currentSlide + 1)}
            />
        );
    }

    return null;
};

export default SliderButtons;

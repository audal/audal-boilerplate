import React from 'react';
// eslint-disable-next-line import/no-cycle
import { useCarouselContext } from './row';
import ChevronLeftAlternative from '../../../images/chevron-left-alternative.svg';
import ChevronRightAlternative from '../../../images/chevron-right-alternative.svg';
// eslint-disable-next-line import/no-cycle
import Container from './container';

const SliderFloatedButtons = (): JSX.Element | null => {
    const carouselContext = useCarouselContext();

    if (carouselContext) {
        const { currentSlide, slideLength, setCurrentSlide } = carouselContext;
        return (
            <Container css={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                <button
                    type="button"
                    onClick={() => setCurrentSlide(currentSlide - 1)}
                    disabled={currentSlide === 0}
                    css={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        background: '#E2E2E2',
                        alignItems: 'center',
                        borderRadius: '50%',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                        marginLeft: '-50px',
                        transition: '0.3s',
                        flex: 'none',
                    }}
                    style={{
                        opacity: (currentSlide === 0) ? 0.5 : 1,
                        cursor: (currentSlide === 0) ? 'not-allowed' : 'pointer',
                    }}
                >
                    <ChevronLeftAlternative />
                </button>
                <button
                    type="button"
                    onClick={() => setCurrentSlide(currentSlide + 1)}
                    disabled={currentSlide === slideLength - 1}
                    css={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        background: '#E2E2E2',
                        alignItems: 'center',
                        borderRadius: '50%',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                        marginRight: '-50px',
                        transition: '0.3s',
                        flex: 'none',
                    }}
                    style={{
                        opacity: (currentSlide === slideLength - 1) ? 0.5 : 1,
                        cursor: (currentSlide === slideLength - 1) ? 'not-allowed' : 'pointer',
                    }}
                >
                    <ChevronRightAlternative />
                </button>
            </Container>
        );
    }

    return null;
};

export default SliderFloatedButtons;

import React from 'react';
// eslint-disable-next-line import/no-cycle
import { useCarouselContext } from './row';
import ColSet from './col-set';
import VisuallyHidden from '../visually-hidden';
import { useGridContext } from './context';

const SliderDots = (): JSX.Element | null => {
    const { sortedBreakpoints: outerBreakpoints } = useGridContext();
    const carouselContext = useCarouselContext();

    const css = React.useMemo(() => {
        let hadCarouselBreakpoint = false;
        return Object.fromEntries(outerBreakpoints.map(([selected, { query }]) => {
            if (carouselContext
                && ((carouselContext.carousel?.breakpoint === selected && !hadCarouselBreakpoint)
                    || hadCarouselBreakpoint)) {
                hadCarouselBreakpoint = true;
                return [query, {
                    display: 'unset',
                }];
            }
            return [query, {
                display: 'none',
            }];
        }));
    }, [carouselContext, outerBreakpoints]);

    if (carouselContext) {
        const { currentSlide, slideLength, setCurrentSlide } = carouselContext;
        return (
            <div css={css}>
                <ColSet breakpoints={{ dt: { between: 14 } }}>
                    {(Array.from(new Array(slideLength)).map((_, idx) => (
                        <button
                            type="button"
                            css={{
                                height: '10px',
                                width: '10px',
                                borderRadius: '500px',
                                transition: '0.3s',
                                backgroundColor: currentSlide === idx ? 'var(--color-primary-amazon)' : '#d9d9d9',
                            }}
                            onClick={() => {
                                setCurrentSlide(idx);
                            }}
                        >
                            <VisuallyHidden>
                                Go to slide
                                {' '}
                                {idx}
                            </VisuallyHidden>
                        </button>
                    )))}
                </ColSet>
            </div>
        );
    }

    return null;
};

export default SliderDots;

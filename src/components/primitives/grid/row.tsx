import React from 'react';
import { useGridContext } from './context';
import { useDraggable } from '../../../utils/use-draggable-scroll';
import SliderDots from './slider-dots';
import Container from './container';

type Row = HtmlPropsNoRef<HTMLDivElement> & Pick<CarouselContext, 'carousel'>;

interface CarouselContext {
    carousel?: {
        breakpoint: string
        columnsInView: number
    }
    currentSlide: number
    slideLength: number
    setCurrentSlide: (slide: number) => void
    setSlideLength: (count: number) => void
    setSlideVisible: (slide: number) => void
}

const CarouselContext = React.createContext<CarouselContext>({} as CarouselContext);

export const useCarouselContext = (): CarouselContext | null => React.useContext(CarouselContext);

const RenderRow = (props: HtmlPropsNoRef<HTMLDivElement>): JSX.Element => {
    const { sortedBreakpoints: outerBreakpoints } = useGridContext();
    const carouselContext = useCarouselContext();

    const css = React.useMemo(() => {
        let hadCarouselBreakpoint = false;
        let adjustedCols = 0;
        let minWidth: string | null = null;
        let containerSize = {};
        return Object.fromEntries(outerBreakpoints.map(([selected, { query, gap, columns }]) => {
            if (carouselContext && carouselContext.carousel?.breakpoint === selected && !hadCarouselBreakpoint) {
                hadCarouselBreakpoint = true;
                if (adjustedCols === 0) {
                    adjustedCols = columns;
                }
                minWidth = `calc(100% * ${adjustedCols / carouselContext.carousel.columnsInView} - ${(adjustedCols / carouselContext.carousel.columnsInView) * adjustedCols}vw)`;
                containerSize = {
                    paddingLeft: '10vw',
                    paddingRight: '10vw',
                    '@media (max-width: 767px)': {
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    },
                };
            } else if (!hadCarouselBreakpoint) {
                adjustedCols = columns;
            }

            return [query, {
                display: 'grid',
                gridTemplateColumns: `repeat(${adjustedCols}, 1fr)`,
                gridColumnGap: `${gap}px`,
                minWidth: minWidth || '',
                ...containerSize,
            }];
        }));
    }, [carouselContext, outerBreakpoints]);

    return (
        <div
            css={{
                ...css,
                width: '100%',
                margin: 'auto',
                position: 'relative',
            }}
            className="__row"
            {...props}
        />
    );
};

const Row = ({ carousel, ...props }: Row): JSX.Element => {
    const [currentSlide, _setCurrentSlide] = React.useState(0);
    const [slideLength, setSlideLength] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const { events } = useDraggable(ref as any);

    const setCurrentSlide = (slide: number): void => {
        const parent = ref?.current?.querySelector('.__row');
        if (parent) {
            const filtered = Array.prototype.filter.call(parent.children, x => window.getComputedStyle(x).display !== 'none');
            const child = filtered[slide];
            if (child) {
                child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    };

    const setSlideVisible = (slide: number): void => {
        _setCurrentSlide(slide);
    };

    const value = React.useMemo(() => (
        {
            carousel, currentSlide, slideLength, setCurrentSlide, setSlideVisible, setSlideLength,
        }
    ), [carousel, currentSlide, slideLength]);

    return (
        <>
            {!carousel && (
                <RenderRow {...props} />
            )}
            {carousel && (
                <CarouselContext.Provider value={value}>
                    <div
                        css={{
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        }}
                        ref={ref}
                        {...events}
                    >
                        <RenderRow {...props} />
                    </div>
                    <Container>
                        <SliderDots breakpoint={carousel.breakpoint} />
                    </Container>
                </CarouselContext.Provider>
            )}
        </>
    );
};

export default Row;

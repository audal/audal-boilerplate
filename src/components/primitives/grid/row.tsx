import React from 'react';
/* eslint-disable-next-line import/no-cycle */
import { useGridContext } from './context';
import { useDraggable } from '../../../utils/use-draggable-scroll';
import SliderDots from './slider-dots';
import SliderButtons from './slider-buttons';
import useBreakpointValue from './use-breakpoint-value';
import SliderFloatedButtons from './slider-floated-buttons';
import { useSplitColumn } from './split-column-context';
import useResizeEvent from '../../../utils/use-resize-event';

type Row = HtmlPropsNoRef<HTMLDivElement> & Pick<CarouselContext, 'carousel'> & { overflowStyle?: React.CSSProperties, arrowStyle?: 'default' | 'floated' };

interface CarouselContext {
    carousel?: {
        [breakpoint: string]: { columnsPerCard: number, overflow?: boolean }
    }
    currentSlide: number
    slideLength: number
    setCurrentSlide: (slide: number) => void
    setSlideLength: (count: number) => void
    setSlideVisible: (slide: number) => void
}

const CarouselContext = React.createContext<CarouselContext>({} as CarouselContext);

export const useCarouselContext = (): CarouselContext | null => React.useContext(CarouselContext);

const RenderRow = ({ children, className, ...props }: HtmlPropsNoRef<HTMLDivElement>): JSX.Element => {
    const { sortedBreakpoints: outerBreakpoints } = useGridContext();
    const carouselContext = useCarouselContext();
    const cols = useSplitColumn();

    const css = React.useMemo(() => {
        let adjustedCols = 0;
        let containerSize = {};
        let lastCarouselBreakpoint: { overflow?: boolean; columnsPerCard: number; } | null = null;
        return Object.fromEntries(outerBreakpoints.map(([selected, { query, gap, columns }]) => {
            if (carouselContext && carouselContext?.carousel?.[selected]) {
                lastCarouselBreakpoint = carouselContext.carousel[selected];
            }
            const columnsInView = columns;
            if (carouselContext && lastCarouselBreakpoint) {
                if (lastCarouselBreakpoint.overflow || (carouselContext?.carousel && carouselContext.carousel[selected]?.overflow)) {
                    if (adjustedCols === 0) {
                        adjustedCols = columns;
                    }
                    containerSize = {
                        gridTemplateColumns: 'unset',
                        gridAutoFlow: 'column',
                        gridAutoColumns: `min(max(calc(${100 / columnsInView}% - (${columnsInView - 1} * ${gap}px) / ${columnsInView}), 270px / ${Math.max(columnsInView / 2, 4)}), 310px / ${Math.max(columnsInView / 2, 4)})`,
                        paddingLeft: '32px',
                        paddingRight: '32px',
                        minWidth: 'unset',
                        '&::after': {
                            content: '""',
                            width: '1px',
                        },
                        '@media screen and (max-width: 767px)': {
                            // paddingLeft: '5vw',
                            // paddingRight: '5vw',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            '&::after': {
                                content: '""',
                                width: '1px',
                            },
                        },
                    };
                } else {
                    containerSize = {
                        gridAutoFlow: 'column',
                        gridAutoColumns: `calc(${100 / columnsInView}% - (${columnsInView - 1} * ${gap}px) / ${columnsInView})`,
                    };
                }
            }
            if (!lastCarouselBreakpoint) {
                adjustedCols = columns;
            }

            return [query, {
                display: 'grid',
                gridTemplateColumns: `repeat(${adjustedCols}, 1fr)`,
                gridColumnGap: `${gap}px`,
                ...containerSize,
            }];
        }));
    }, [carouselContext, outerBreakpoints]);

    return (
        <div
            className={`__row ${className || ''}`}
            css={{
                ...css,
                width: '100%',
                margin: 'auto',
                position: 'relative',
            }}
            {...props}
        >
            {children}
        </div>
    );
};

const Row = ({ carousel, overflowStyle = {}, arrowStyle = 'default', ...props }: Row): JSX.Element => {
    const [currentSlide, _setCurrentSlide] = React.useState(0);
    const [slideLength, setSlideLength] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const { events } = useDraggable(ref as any);
    const { sortedBreakpoints: outerBreakpoints, desktopFirst } = useGridContext();

    const { computedSlideLength, slidesAtBreakpoint } = useBreakpointValue({
        items: (() => {
            let lastCarouselBreakpoint;
            return outerBreakpoints.map((x) => {
                if (carousel?.[x[0]]) {
                    lastCarouselBreakpoint = carousel[x[0]];
                } else {
                    lastCarouselBreakpoint = { columnsPerCard: 4, overflow: false };
                }
                return {
                    query: x[1].query,
                    value: {
                        computedSlideLength: Math.ceil((lastCarouselBreakpoint.columnsPerCard * slideLength) / x[1].columns),
                        slidesAtBreakpoint: x[1].columns / lastCarouselBreakpoint.columnsPerCard,
                        overflowAtBreakpoint: lastCarouselBreakpoint.overflow,
                    },
                };
            });
        })(),
        defaultValue: {
            computedSlideLength: 0,
            slidesAtBreakpoint: 1,
        },
        desktopFirst,
    });

    const size = useResizeEvent(ref);

    React.useEffect(() => {
        if (carousel && ref?.current) {
            ref.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [size]);

    const setCurrentSlide = (slide: number): void => {
        const parent = ref?.current?.querySelector('.__row');
        if (parent) {
            const filtered = Array.prototype.filter.call(parent.children, x => window.getComputedStyle(x).display !== 'none');
            const { child, isLast } = (() => ({ child: filtered[Math.min(Math.max(slide, 0), filtered.length - 1) * slidesAtBreakpoint], isLast: slide * slidesAtBreakpoint === filtered.length - 1 }))();

            console.log(child, slide, slidesAtBreakpoint);
            if (child && ref?.current) {
                const childBounds = child.getBoundingClientRect();
                const vwMeasure = ref.current.getBoundingClientRect().x;
                const currentOffset = ref.current.scrollLeft;

                if (isLast) {
                    ref.current.scrollTo({ behavior: 'smooth', left: childBounds.left + childBounds.width + currentOffset });
                } else {
                    ref.current.scrollTo({ behavior: 'smooth', left: childBounds.left + currentOffset - vwMeasure });
                }
                // child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    };

    const setSlideVisible = (slide: number): void => {
        console.log('visible', slide, Math.max(Math.abs((Math.round((slide - 1) / slidesAtBreakpoint) * slidesAtBreakpoint) / slidesAtBreakpoint), 0));
        if (slidesAtBreakpoint > 1) {
            _setCurrentSlide(Math.max(Math.abs((Math.round((slide - 1) / slidesAtBreakpoint) * slidesAtBreakpoint) / slidesAtBreakpoint), 0));
        } else {
            _setCurrentSlide(Math.abs((Math.round((slide) / slidesAtBreakpoint) * slidesAtBreakpoint) / slidesAtBreakpoint));
        }
    };

    const value = React.useMemo(() => (
        {
            carousel, currentSlide, slideLength: computedSlideLength, setCurrentSlide, setSlideVisible, setSlideLength,
        }
    ), [carousel, currentSlide, computedSlideLength, setCurrentSlide, setSlideVisible, setSlideLength]);

    return (
        <>
            {!carousel && (
                <RenderRow {...props} />
            )}
            {carousel && (
                <CarouselContext.Provider value={value}>
                    {arrowStyle === 'floated' && (
                        <div css={{
                            position: 'absolute',
                            top: 'calc(50% - 15px)',
                            width: '100%',
                            left: '0',
                            display: computedSlideLength < 4 ? 'none' : 'flex',
                            '@media (max-width: 1200px)': {
                                display: 'none',
                            },
                        }}
                        >
                            <SliderFloatedButtons />
                        </div>
                    )}
                    <div
                        css={{
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                            ...overflowStyle,
                        }}
                        ref={ref}
                        {...events}
                    >
                        <RenderRow {...props} />
                    </div>
                    {arrowStyle === 'default' && (
                        <div css={{
                            width: '100%',
                            marginTop: '44px',
                            padding: '20px 0',
                            position: 'relative',
                            display: computedSlideLength < 2 ? 'none' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '@media (max-width: 1200px)': {
                                display: 'none',
                            },
                        }}
                        >
                            <div>
                                <SliderDots />
                            </div>
                            <div css={{
                                position: 'absolute',
                                right: '0',
                            }}
                            >
                                <SliderButtons />
                            </div>
                        </div>
                    )}
                </CarouselContext.Provider>
            )}
        </>
    );
};

export default Row;

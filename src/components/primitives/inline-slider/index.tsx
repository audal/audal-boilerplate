import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { PressLessImage } from '../image/gatsby-image-svg-fallback';
import SingleArrow from '../control-handles/single-arrow';
import SearchSvg from '../../../images/search.svg';
import ModalSlider from './modal-slider';

interface InlineSliderProps {
    slides?: {
        image: any;
        caption?: string;
    }[];
    textType?: boolean
}

const InlineSlider = ({ slides, textType, ...props }: InlineSliderProps): JSX.Element | null => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [loaded, setLoaded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(currentSlide) {
            setCurrentSlide(currentSlide.track.details.rel);
        },
        slides: {
            perView: 1,
        },
        created() {
            setLoaded(true);
        },
    });

    const slideLengthNumber = ((instanceRef?.current?.track?.details?.slides?.length || 1) - 1) || Number;

    if (!slides || slides.length === 0 || slides.filter(x => !!x.image).length === 0) return null;

    return (
        <div
            css={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div css={{ position: 'relative' }} {...props}>
                <div
                    ref={sliderRef}
                    className="keen-slider"
                    css={{
                        width: '100%',
                        height: 'auto',
                    }}
                >
                    {slides && slides?.map(slideItem => (
                        <div
                            className="keen-slider__slide"
                            key={slideItem.image}
                            css={{ width: '100%' }}
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            {slideItem.image && (
                                <PressLessImage
                                    image={slideItem.image}
                                    css={{
                                        width: '100%',
                                        height: `${textType ? '100%' : '100%'}`,
                                        objectFit: 'cover',
                                        marginBottom: '12px',
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                {slides && slides.length > 1 && (
                    <div css={{
                        whiteSpace: 'nowrap',
                        flex: 'none',
                        background: '#17487440',
                        borderRadius: '2px',
                        position: 'absolute',
                        bottom: '5px',
                        right: '40px',
                        padding: '0 6px',
                        height: '30px',
                        color: 'var(--color-gray-white)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        letterSpacing: '1px',
                    }}
                    >
                        {currentSlide + 1}
                        /
                        {slides.length}
                    </div>
                )}
                <div
                    css={{
                        background: '#17487440',
                        borderRadius: '2px',
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        height: '30px',
                        width: '30px',
                        color: 'var(--color-gray-white)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <SearchSvg
                        css={{
                            width: '20px',
                            height: '20px',
                        }}
                    />
                </div>
            </div>
            {(slides && loaded && instanceRef.current) && (
                <div
                    css={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '18px',
                    }}
                >
                    <SingleArrow
                        show={slides?.length > 1}
                        isLeft
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                        disabled={currentSlide === 0}
                    />
                    <div
                        className="p3"
                        css={{
                            padding: slides?.length > 1 ? '0 10px' : '0px',
                            width: '100%',
                            '@media(max-width: 767px)': { textAlign: 'center' },
                        }}
                        dangerouslySetInnerHTML={{ __html: slides[currentSlide]?.caption || '' }}
                    />
                    <SingleArrow
                        show={slides?.length > 1}
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                        disabled={
                            currentSlide === slideLengthNumber
                        }
                    />
                </div>
            )}
            {open && (
                <ModalSlider
                    open={open}
                    setOpen={setOpen}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    loaded={loaded}
                    slides={slides}
                    slideLengthNumber={slideLengthNumber}
                    instanceRef={instanceRef}
                />
            )}

        </div>
    );
};

export default InlineSlider;

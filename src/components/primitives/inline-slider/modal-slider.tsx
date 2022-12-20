import React from 'react';
import { useKeenSlider, KeenSliderInstance, KeenSliderHooks } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import {Modal, ModalCloseButton, ModalContent} from '../modal';
import { PressLessImage } from '../image/gatsby-image-svg-fallback';
import Arrows from '../control-handles/arrows';

interface InlineSliderProps {
    currentSlide: number;
    loaded?:boolean;
    slides?: {
        image: any;
        caption?: string;
    }[];
    open: boolean
    slideLengthNumber: number | NumberConstructor;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    instanceRef: React.MutableRefObject<
    KeenSliderInstance<Record<string, unknown>, Record<string, unknown>, KeenSliderHooks> | null
    >
}

const ModalSlider = ({
    currentSlide, setCurrentSlide, loaded, slides, slideLengthNumber, instanceRef, open, setOpen
}: InlineSliderProps): JSX.Element => {
    const [currentModalSlide, setCurrentModalSlide] = React.useState(currentSlide);
    const [frozenInitial] = React.useState(currentSlide)
    const [sliderRefModal, instanceRefModal] = useKeenSlider<HTMLDivElement>({
        initial: frozenInitial,
        slides: {
            perView: 1,
        },
        slideChanged(currentSlide) {
            setCurrentSlide(currentSlide.track.details.rel)
            instanceRef?.current?.moveToIdx(currentSlide.track.details.rel)
            setCurrentModalSlide(currentSlide.track.details.rel);
        },
    });

    return (
        <Modal open={open} onOpenChange={setOpen}>
            <ModalContent
                css={{
                    width: '70vw',
                    minWidth: '70vw',
                    backgroundColor: 'unset',
                    boxShadow: 'unset',
                    padding: '0',
                    zIndex: '100',
                    height: 'auto',
                    '@media (max-width: 767px)': {
                        maxWidth: '100%',

                    },
                }}
            >
                <ModalCloseButton
                    css={{
                        marginRight: '-15px',
                        marginTop: '-50px',
                        '& svg *': {
                            stroke: 'var(--color-gray-white)',
                        },
                    }}
                    onClick={() => {
                        setOpen(false);
                    }}
                />
                <div
                    css={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        ref={sliderRefModal}
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
                            >
                                {slideItem.image && (
                                    <div
                                        css={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            // height: '100%',
                                            height: '67vh',
                                            '& img, & > div': {
                                                height: '67vh',
                                                width: '100%',
                                                objectFit: 'contain',
                                            },
                                            '@media (max-width: 767px)': {
                                                '& img': {
                                                    height: '100%',
                                                },
                                                '& > div': {
                                                    height: '67vh',
                                                },
                                            },
                                        }}
                                    >

                                        <PressLessImage
                                            image={slideItem.image}
                                            css={{
                                                width: '100%',

                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {(slides && slides.length > 0 && loaded) && (
                        <div
                            css={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '16px',
                            }}
                        >
                            <div
                                className="p3"
                                css={{
                                    paddingRight: '9px',
                                    width: '100%',
                                    color: '#FEFEFE',
                                    '@media(max-width: 767px)': { textAlign: 'center' },
                                }}
                            >
                                {slides[currentModalSlide]?.caption}
                            </div>
                            {slides.length > 1 && (<Arrows
                                captionText={`${currentModalSlide + 1}/${slides.length}`}
                                theme="white"
                                onClickLeft={() => {
                                    instanceRefModal.current?.prev();
                                }}
                                hasLeft={currentModalSlide !== 0}
                                onClickRight={() => {
                                    instanceRefModal.current?.next();
                                }}
                                hasRight={
                                    currentModalSlide !== slideLengthNumber
                                }
                            />)}
                        </div>
                    )}
                </div>
            </ModalContent>
        </Modal>
    );
};

export default ModalSlider;

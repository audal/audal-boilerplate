import React, { useState } from 'react';
import { connectPagination } from 'react-instantsearch-dom';
import ChevronLeft from '../../../images/chevron-left.svg';
import ChevronRight from '../../../images/chevron-right.svg';
import { StyledIconButtonColored } from '../styled-icon-button';
import ColSet from '../grid/col-set';

const Pagination = connectPagination(({ currentRefinement, nbPages, refine }: any) => {
    const [timer, setTimer] = useState(null);

    function changeDelay(change) {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                if (change > 0 && change <= nbPages) { refine(parseInt(change)); }
            }, 500),
        );
    }
    return (
        <div
            css={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '39px',
                paddingBottom: '39px',
                '@media (max-width: 767px)': {
                    paddingTop: '16px',
                    paddingBottom: '16px',
                },
            }}
        >

            {nbPages > 0 && (
                <StyledIconButtonColored
                    css={{
                        width: '51px',
                        height: '51px',
                        display: 'flex',
                        alignItems: 'center',
                        borderColor: 'var(--color-blue-mittelblau)',
                        borderWidth: '1px',
                        borderRadius: '500px',
                        justifyContent: 'center',
                        '@media (max-width: 767px)': {
                            width: '38px',
                            height: '38px',
                        },
                    }}
                    disabled={currentRefinement === 1 || nbPages < 2}
                    onClick={(event) => {
                        event.preventDefault();
                        refine(currentRefinement - 1);
                    }}
                >
                    <ChevronLeft />
                </StyledIconButtonColored>
            )}
            <ColSet breakpoints={{ dt: { between: 18 }, mb: { between: 10 } }} css={{ width: 'unset' }}>
                {new Array(nbPages).fill(null).map((_, index) => {
                    const page = index + 1;
                    return (
                        <StyledIconButtonColored
                            key={index}
                            css={{
                                width: '51px',
                                height: '51px',
                                display: 'flex',
                                minWidth: '52px',
                                minHeight: '52px',
                                alignItems: 'center',
                                borderRadius: '500px',
                                justifyContent: 'center',
                                borderColor: 'var(--color-blue-mittelblau)',
                                color: 'var(--color-blue-mittelblau)',
                                '@media (max-width: 767px)': {
                                    width: '38px',
                                    height: '38px',
                                    minWidth: '38px',
                                    minHeight: '38px',
                                },
                            }}
                            data-active={currentRefinement === page ? 'true' : ''}
                            onClick={(event) => {
                                event.preventDefault();
                                refine(page);
                            }}
                        >
                            <span className="h4">{page}</span>
                        </StyledIconButtonColored>
                    );
                }).slice(Math.max(currentRefinement - 2, 0), Math.max(currentRefinement - 2, 0) + 3)}
                {currentRefinement < nbPages - 2 && (
                    <StyledIconButtonColored
                        css={{
                            width: '51px',
                            height: '51px',
                            display: 'flex',
                            minWidth: '52px',
                            minHeight: '52px',
                            alignItems: 'center',
                            borderRadius: '500px',
                            justifyContent: 'center',
                            borderColor: 'var(--color-blue-mittelblau)',
                            color: 'var(--color-blue-mittelblau)',
                            '@media (max-width: 767px)': {
                                width: '38px',
                                height: '38px',
                                minWidth: '38px',
                                minHeight: '38px',
                            },
                        }}
                    >

                        <input
                            className="h4"
                            placeholder='...'
                            css={{ width: '44px', backgroundColor: 'transparent', textAlign: 'center' }}
                            onChange={(e) => {
                                changeDelay(e.target.value);
                            }}
                        />
                    </StyledIconButtonColored>
                )}
                {currentRefinement < nbPages - 1 && (
                    <StyledIconButtonColored
                        css={{
                            width: '51px',
                            height: '51px',
                            display: 'flex',
                            minWidth: '52px',
                            minHeight: '52px',
                            alignItems: 'center',
                            borderRadius: '500px',
                            justifyContent: 'center',
                            borderColor: 'var(--color-blue-mittelblau)',
                            color: 'var(--color-blue-mittelblau)',
                            '@media (max-width: 767px)': {
                                width: '38px',
                                height: '38px',
                                minWidth: '38px',
                                minHeight: '38px',
                            },
                        }}
                        data-active={currentRefinement === nbPages ? 'true' : ''}
                        onClick={(event) => {
                            event.preventDefault();
                            refine(nbPages);
                        }}
                    >
                        <span className="h4">{nbPages}</span>
                    </StyledIconButtonColored>
                )}
            </ColSet>
            {nbPages > 0 && (
                <StyledIconButtonColored
                    disabled={currentRefinement === nbPages}
                    onClick={(event) => {
                        event.preventDefault();
                        refine(currentRefinement + 1);
                    }}
                    css={{
                        width: '51px',
                        height: '51px',
                        display: 'flex',
                        alignItems: 'center',
                        borderColor: 'var(--color-blue-mittelblau)',
                        borderWidth: '1px',
                        borderRadius: '500px',
                        justifyContent: 'center',
                        '@media (max-width: 767px)': {
                            width: '38px',
                            height: '38px',
                        },
                    }}
                >
                    <ChevronRight />
                </StyledIconButtonColored>
            )}
        </div>
    );
});

export default Pagination;

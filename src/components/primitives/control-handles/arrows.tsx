import React from 'react';
import ChevronLeft from '../../../images/chevron-left.svg';
import ChevronRight from '../../../images/chevron-right.svg';

interface ArrowsProps {
    onClickLeft: () => void
    onClickRight: () => void
    hasLeft: boolean
    hasRight: boolean
    theme?: 'blue' | 'white'
    captionText?: string
}

const Arrows = ({
    onClickLeft, hasLeft, onClickRight, hasRight, captionText, theme = 'blue',
}: ArrowsProps) => (
    <div
        css={{
            width: 'auto',
            height: 'auto',
            display: 'flex',
            position: 'relative',
            alignItems: 'flex-start',
            flexDirection: 'column',
            '@media (max-width: 767px)': {
                width: 'auto',
                height: 'auto',
            },
        }}
    >
        <div
            css={{
                width: '100%',
                height: '100%',
                display: 'flex',
                minWidth: '129px',
                alignItems: 'center',
                justifyContent: 'space-between',
                '@media (max-width: 767px)': {
                    width: 'auto',
                    height: 'auto',
                    minWidth: '96px',
                    justifyContent: 'center',
                },
            }}
        >
            <button
                type="button"
                aria-label="Links"
                css={{
                    width: '51px',
                    height: '51px',
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: theme === 'white' ? 'var(--color-gray-almostwhite)' : 'var(--color-blue-dunkelblau)',
                    color: theme === 'white' ? 'var(--color-gray-almostwhite)' : 'var(--color-blue-mittelblau)',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderRadius: '500px',
                    justifyContent: 'center',
                    transition: '0.3s',
                    flex: 'none',
                    '@media (max-width: 767px)': {
                        width: '38px',
                        height: '38px',
                    },
                }}
                style={{
                    opacity: hasLeft ? 1 : 0.33,
                }}
                onClick={() => {
                    onClickLeft();
                }}
            >
                <ChevronLeft />
            </button>
            {captionText && (
                <div css={{
                    color: theme === 'white' ? 'var(--color-gray-almostwhite)' : 'var(--color-blue-dunkelblau)',
                    padding: '0 18px',
                    letterSpacing: '2px',
                    marginTop: '-2px',
                }}
                >
                    {captionText}
                </div>
            )}
            <button
                type="button"
                aria-label="Rechts"
                css={{
                    width: '51px',
                    height: '51px',
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: theme === 'white' ? 'var(--color-gray-almostwhite)' : 'var(--color-blue-dunkelblau)',
                    color: theme === 'white' ? 'var(--color-gray-almostwhite)' : 'var(--color-blue-mittelblau)',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderRadius: '500px',
                    justifyContent: 'center',
                    transition: '0.3s',
                    flex: 'none',
                    '@media (max-width: 767px)': {
                        width: '38px',
                        height: '38px',
                    },
                }}
                style={{
                    opacity: hasRight ? 1 : 0.33,
                }}
                onClick={() => {
                    onClickRight();
                }}
            >
                <ChevronRight />
            </button>
        </div>
    </div>
);

export default Arrows;

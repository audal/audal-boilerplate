import React from 'react';
import ColSet from '../grid/col-set';
import VisuallyHidden from '../visually-hidden';

interface BulletPointsProps {
    currentSlide: number
    length: number;
    onClick: (index: number) => void
}

const BulletPoints = ({ currentSlide, length, onClick }: BulletPointsProps) => (
    <div
        css={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
    >
        <ColSet breakpoints={{ dt: { between: 20 } }}>
            {(Array.from(new Array(length)).map((_, idx) => (
                <button
                    type="button"
                    css={{
                        width: '9px',
                        height: '9px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        borderRadius: '500px',
                        transition: '0.3s',
                        backgroundColor: 'var(--color-blue-dunkelblau)',
                    }}
                    style={{
                        opacity: currentSlide === idx ? 1 : 0.3,
                    }}
                    onClick={() => {
                        onClick(idx);
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

export default BulletPoints;

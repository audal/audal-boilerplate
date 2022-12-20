import React from 'react';
import ChevronLeftSvg from '../../../images/chevron-left.svg';
import ChevronRightSvg from '../../../images/chevron-right.svg';

interface SingleArrowProps {
    disabled?: boolean;
    isLeft?: boolean;
    show?: boolean;
    onClick: (e: any) => void;
}
const SingleArrow = ({ disabled, isLeft, onClick, show }: SingleArrowProps) => (
    <button
        type="button"
        aria-label={isLeft ? 'Links' : 'Rechts'}
        onClick={onClick}
        css={{
            display: show ? 'flex' : 'none',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-gray-mittelgrau)',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flex: 'none',
            svg: {
                transition: '0.3s',
            },
        }}
    >
        {isLeft ? (
            <ChevronLeftSvg stroke={`${disabled ? '#D5D5D5' : '#7A8991'}`} width='11px' height='16px' />
        ) : (
            <ChevronRightSvg stroke={`${disabled ? '#D5D5D5' : '#7A8991'}`} width='11px' height='16px' />
        )}
    </button>
);

export default SingleArrow;

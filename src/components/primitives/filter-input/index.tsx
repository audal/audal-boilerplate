import React from 'react';
import Input from '../input';
import SearchSvg from '../../../images/search.svg';
import CancelSvg from '../../../images/cancel.svg';
import VisuallyHidden from '../visually-hidden';

interface FilterInputProps {
    placeholder: string;
    className?: string
    name: string;
    value: string;
    onChange?: (value: string) => void
}

const FilterInput = ({ placeholder, className, name, value, onChange }: FilterInputProps): JSX.Element => (
    <div
        css={{
            width: '100%',
            height: 'auto',
            position: 'relative',
        }}
    >
        <Input
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                if (onChange) {
                    // @ts-ignore
                    onChange(e.target.value);
                }
            }}
            className={className}
            css={{
                width: '100%',
                border: '1px solid #707070',
                paddingTop: '12px',
                paddingLeft: '58px',
                borderRadius: '30px',
                paddingBottom: '12px',
                backgroundColor: 'var(--color-gray-white)',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.0784314)',
                "@media (max-width: 767px)":{
                    paddingTop: '8px',
                    paddingBottom: '8px',
                }
            }}
        />
        <SearchSvg
            css={{
                top: '50%',
                transform: 'translateY(-50%)',
                left: '18px',
                width: '23px',
                height: '23px',
                position: 'absolute',
                objectFit: 'cover',
                color: '#47474A',
               
            }}
        />
        {value && (
            <button
                type="button"
                css={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: '22px',
                    position: 'absolute',
                    objectFit: 'cover',
                }}
                onClick={() => {
                    if (onChange) {
                        onChange('');
                    }
                }}
            >
                <VisuallyHidden>
                    Saubere Suche
                </VisuallyHidden>
                <CancelSvg
                    css={{
                        width: '17px',
                        height: '17px',
                    }}
                />
            </button>
        )}
    </div>
);
export default FilterInput;

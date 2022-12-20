import React from 'react';
import { Controller } from 'react-hook-form';
import StyledCheckbox from '../styled-checkbox';

const StyledFormCheckbox = ({ 
    name, value, children, required 
}: { name: string, value: string, children: React.ReactNode | string, required?: boolean }) => (
    <Controller
        name={name}
        rules={{
            required,
        }}
        render={({ field }) => (
            <StyledCheckbox
                isChecked={field.value === value}
                onClick={() => {
                    field.value === value ? field.onChange('') : field.onChange(value);
                }}
            >
                {children}
            </StyledCheckbox>
        )}
    />
);

export default StyledFormCheckbox;

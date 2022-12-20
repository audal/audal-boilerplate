import React from 'react';

/**
 * Simple Accessible Alert component that can be re-used.
 * @alias HtmlPropsHTMLSpanElement>
 * */
const FormAlert: React.FC = React.forwardRef<
HTMLSpanElement,
HtmlProps<HTMLSpanElement>
>((props, ref) => (
    <span
        ref={ref}
        role="alert"
        css={{
            display: 'block',
            color: 'var(--color-blue-dunkelblau)',
            paddingTop: '6px',
            fontSize: '10px',
        }}
        {...props}
    />
));

FormAlert.displayName = 'FormAlert';

export default FormAlert;

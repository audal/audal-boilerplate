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
            color: 'red',
            paddingTop: '6px',
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: 'bold',
        }}
        {...props}
    />
));

FormAlert.displayName = 'FormAlert';

export default FormAlert;

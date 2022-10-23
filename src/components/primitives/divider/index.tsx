import React from 'react';

const Divider = ({
    className,
    ...props
}: HtmlPropsNoRef<HTMLHRElement>): JSX.Element => (
    <hr
        aria-orientation="horizontal"
        css={{
            opacity: 0.6,
            borderColor: '#bab6af44',
            borderStyle: 'solid',
            borderTopWidth: '1px',
            width: '100%',
        }}
        className={className}
        {...props}
    />
);

export default Divider;

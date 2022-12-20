import React from 'react';

interface Props {
    shouldChange: string;
    transitionDuration?: number;
}

const FadeTransition: React.FC<Props> = ({ shouldChange, transitionDuration, children }) => {
    const prevChildren = React.useRef<React.ReactNode>(null);
    const currentChildren = React.useRef<React.ReactNode>(null);
    const currentContainer = React.useRef<HTMLDivElement>(null);

    const [isAnimating, setIsAnimating] = React.useState<boolean>(false);

    const currentKey = React.useRef<string>('');

    if (
        currentKey?.current !== null
    && currentKey.current !== shouldChange
    && currentChildren?.current
    && currentChildren.current !== children
    ) {
        currentKey.current = shouldChange;
        prevChildren.current = currentChildren.current;
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), transitionDuration || 200);
    } else {
        currentChildren.current = children;
        currentKey.current = shouldChange;
    }

    return (
        <div css={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexGrow: 1,
            position: 'relative',
        }}
        >
            <div
                css={{
                    display: 'flex',
                    width: '100%',
                    // height: '100%',
                    transition: transitionDuration ? `${transitionDuration / 1000}s` : '0.2s',
                    opacity: isAnimating ? 0 : 1,
                    flexGrow: 1,
                }}
                ref={currentContainer}
            >
                {isAnimating ? prevChildren.current : children}
            </div>
        </div>
    );
};

export default FadeTransition;

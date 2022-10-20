import React from 'react';

/*
 * Wrap for useWindowScroll hook that only provides direction.
 * Avoids using existing useWindowScroll hook to stop a million refreshes
 * that aren't needed if all we want to track is scroll direction.
 * Direction (scrolling-down) = +1
 * Direction (scrolling-up) = -1
 * */
const useScrollDirection = (): number => {
    const lastProgress = React.useRef(0);
    const scrollDirectionRef = React.useRef<number>(1);
    const [scrollDirection, setDirection] = React.useState<number>(1);

    React.useEffect(() => {
        let didUnsubscribe = 0;
        const listener = () => {
            if (didUnsubscribe) return;
            const progress = window.scrollY;
            const direction = lastProgress.current < progress ? 1 : -1;
            if (lastProgress.current !== progress && scrollDirectionRef.current !== direction) {
                scrollDirectionRef.current = direction;
                setDirection(direction);
            }

            lastProgress.current = progress;
        };

        window.addEventListener('scroll', listener);

        return () => {
            didUnsubscribe = 1;
            window.removeEventListener('scroll', listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return scrollDirection;
};

export default useScrollDirection;

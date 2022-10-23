import React from 'react';

const useIsTouchDevice = (): boolean => {
    const [isTouch, setIsTouch] = React.useState(false);

    React.useEffect(() => {
        const setupTouch = (): void => {
            setIsTouch(true);
        };
        window.addEventListener('touchstart', setupTouch);
        return () => {
            window.removeEventListener('touchstart', setupTouch);
        };
    }, []);

    return isTouch;
};

export default useIsTouchDevice;

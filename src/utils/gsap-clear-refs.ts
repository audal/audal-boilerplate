import React from 'react';
import gsap from 'gsap';
// Clears all GSAP-set properties for multiple DOM-referencing refs at once
const gsapClearRefs = (inputRefs: React.RefObject<object>[]): void => {
    inputRefs.forEach((ref) => {
        if (ref?.current) {
            gsap.to(ref.current, { clearProps: 'all' });
        }
    });
};

export default gsapClearRefs;

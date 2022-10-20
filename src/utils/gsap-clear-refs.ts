import React from 'react';
import gsap from 'gsap';
// Clears all GSAP-set properties for multiple DOM-referencing refs at once
export const gsapClearRefs = (inputRefs: React.RefObject<object>[]) => {
    inputRefs.forEach((ref) => {
        if (ref?.current) {
            gsap.to(ref.current, { clearProps: 'all' });
        }
    });
};

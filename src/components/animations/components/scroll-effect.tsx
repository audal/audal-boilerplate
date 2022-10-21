import React from 'react';
import { motion, MotionStyle, MotionValue, useScroll } from 'framer-motion';
import useTransformArray from '../hooks/use-transform-array';
import { ScrollCtx } from '../context/scroll-area';

interface StaticRenderProps {
    scrollY: MotionValue;
    properties?: {
        [key in keyof MotionStyle]: (string | number)[];
    };
    inViewProperties?: {
        [key in keyof MotionStyle]: (string | number)[];
    };
    children: React.ReactNode | React.ReactNode[];
}

// This is our 'inner component' which can be destroyed on props update
// Required to stabilize our breaking of the rules of hooks
const StaticRender = ({
    scrollY,
    properties = {},
    inViewProperties = {},
    children,
}: StaticRenderProps): JSX.Element => {
    const [zProps] = React.useState(properties);
    const props = useTransformArray({ properties: zProps, scrollY });
    return (
        <motion.div
            style={{ ...props }}
            initial={{
                ...Object.fromEntries(
                    Object.entries(inViewProperties).map(([k, v]) => [k, v[0]]),
                ),
            }}
            whileInView={{
                ...Object.fromEntries(
                    Object.entries(inViewProperties).map(([k, v]) => [k, v[1]]),
                ),
                transition: { duration: 1 },
            }}
        >
            {children}
        </motion.div>
    );
};

type ScrollEffectProps = Omit<StaticRenderProps, 'scrollY'> & {
    pin?: boolean;
    internalScroller?: boolean;
};

const ScrollEffect = ({
    properties = {},
    inViewProperties = {},
    pin = false, // need to make a better way to do this
    children,
    internalScroller = false,
}: ScrollEffectProps): JSX.Element => {
    const ctx = React.useContext(ScrollCtx);

    const ref = React.useRef(null);
    const { scrollYProgress: yProgress } = useScroll({
        target: ref,
        offset: ['end end', 'start start'],
    });

    return (
        <div ref={ref}>
            <StaticRender
                key={JSON.stringify(properties)}
                scrollY={
                    (ctx?.progress && internalScroller) === false
                        ? ctx?.progress
                        : yProgress
                }
                properties={properties}
                inViewProperties={inViewProperties}
            >
                {children}
            </StaticRender>
        </div>
    );
};

export default ScrollEffect;

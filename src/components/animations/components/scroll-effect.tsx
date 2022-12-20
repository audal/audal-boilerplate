import React from 'react';
import { motion, MotionStyle, MotionValue, useScroll } from 'framer-motion';
import useTransformArray from '../hooks/use-transform-array';
import { ScrollCtx } from '../context/scroll-area';
import { getPositionOfElement } from '../../../utils/get-position-of-element';

interface StaticRenderProps {
    scrollY: MotionValue;
    properties?: {
        [key in keyof MotionStyle]: (string | number)[];
    };
    inViewProperties?: {
        [key in keyof MotionStyle]: (string | number)[];
    };
    children: React.ReactNode | React.ReactNode[];
    transformOrigin?: string
    inViewTransitionTime?: number
    inViewDelay?: number
    runOnce?: boolean
    isPast?: boolean
}

// This is our 'inner component' which can be destroyed on props update
// Required to stabilize our breaking of the rules of hooks
const StaticRender = ({
    scrollY,
    properties = {},
    transformOrigin = 'center center',
    inViewProperties = {},
    inViewTransitionTime = 0.4,
    inViewDelay = 0,
    runOnce = true,
    isPast = false,
    children,
}: StaticRenderProps): JSX.Element => {
    const [zProps] = React.useState(properties);
    const props = useTransformArray({ properties: zProps, scrollY });
    return (
        <motion.div
            style={{ ...props, transformOrigin }}
            initial={(!isPast || !runOnce) ? {
                ...Object.fromEntries(
                    Object.entries(inViewProperties).map(([k, v]) => [k, v[0]]),
                ),
            } : {
                ...Object.fromEntries(
                    Object.entries(inViewProperties).map(([k, v]) => [k, v[1]]),
                ),
            }}
            whileInView={(!isPast || !runOnce) ? {
                ...Object.fromEntries(
                    Object.entries(inViewProperties).map(([k, v]) => [k, v[1]]),
                ),
                transition: { duration: inViewTransitionTime, delay: inViewDelay },
            } : {}}
            viewport={{
                once: runOnce,
            }}
        >
            {children}
        </motion.div>
    );
};

type ScrollEffectProps = Omit<StaticRenderProps, 'scrollY' | 'isPast'> & {
    // pin?: boolean;
    internalScroller?: boolean;
} & HtmlPropsNoRef<HTMLDivElement>;

const ScrollEffect = ({
    transformOrigin,
    properties = {},
    inViewProperties = {},
    inViewTransitionTime = 0.4,
    inViewDelay = 0,
    children,
    internalScroller = false,
    runOnce = true,
    ...props
}: ScrollEffectProps): JSX.Element => {
    const ctx = React.useContext(ScrollCtx);

    const ref = React.useRef(null);
    const { scrollYProgress: yProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end -100vh'],
    });

    const [past, setPast] = React.useState(false);
    React.useEffect(() => {
        const pos = getPositionOfElement(ref);
        if (pos && pos?.top < 0) {
            setPast(true);
        }
    }, [ref]);

    return (
        <div ref={ref} {...props}>
            <StaticRender
                key={JSON.stringify({ properties, past })}
                scrollY={
                    (ctx?.progress && internalScroller) === false
                        ? ctx?.progress
                        : yProgress
                }
                transformOrigin={transformOrigin}
                properties={properties}
                inViewProperties={inViewProperties}
                inViewTransitionTime={inViewTransitionTime}
                inViewDelay={inViewDelay}
                runOnce={runOnce}
                isPast={past}
            >
                {children}
            </StaticRender>
        </div>
    );
};

export default ScrollEffect;

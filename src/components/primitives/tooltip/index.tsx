import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { keyframes } from '@emotion/react';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const fadeOut = keyframes({
    from: { opacity: '1' },
    to: { opacity: '0' },
});

export interface TooltipProps {
    title?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    asChild?: boolean;
    show?: boolean;
    portalled?: boolean;
    className?: string;
}

/* This component creates a tooltip */

const Tooltip: React.FC<TooltipProps> = ({
    title,
    portalled = true,
    show,
    side = 'bottom',
    children,
    asChild = false,
    className,
}) => (
    <TooltipPrimitive.Root delayDuration={100} open={show}>
        <TooltipPrimitive.Trigger
            css={{ width: '100%' }}
            asChild={asChild}
            className={className}
        >
            {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
            portalled={portalled}
            side={side}
            forceMount
            css={{
                borderRadius: 4,
                padding: '8px 14px',
                fontSize: 12,
                lineHeight: 1,
                color: '#fff',
                backgroundColor: '#9DB8D1',
                // transformOrigin: "var(--radix-tooltip-content-transform-origin)",
                boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
                animationDuration: '500ms',
                animationFillMode: 'forwards',
                willChange: 'transform, opacity',
                '&[data-state="delayed-open"]': {
                    '&[data-side="top"]': { animationName: slideDownAndFade },
                    '&[data-side="right"]': { animationName: slideRightAndFade },
                    '&[data-side="bottom"]': { animationName: slideUpAndFade },
                    '&[data-side="left"]': { animationName: slideLeftAndFade },
                },
                '&[data-state="instant-open"]': {
                    '&[data-side="top"]': { animationName: slideDownAndFade },
                    '&[data-side="right"]': { animationName: slideRightAndFade },
                    '&[data-side="bottom"]': { animationName: slideUpAndFade },
                    '&[data-side="left"]': { animationName: slideLeftAndFade },
                },
                '&[data-state="closed"]': {
                    animationName: fadeOut,
                },
                '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none!important',
                },
            }}
            sideOffset={5}
        >
            {title}
            <TooltipPrimitive.Arrow css={{ fill: '#9DB8D1' }} />
        </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
);

export default Tooltip;

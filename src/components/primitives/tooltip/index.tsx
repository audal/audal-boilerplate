/** @jsxImportSource @compiled/react */
import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { keyframes } from '@compiled/react'

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

export interface TooltipProps {
	title?: string,
	side?: "top" | "right" | "bottom" | "left"
}


/* This component creates a tooltip */

const Tooltip: React.FC<TooltipProps> = ({ title, side = "bottom", children }) => {
	return (
		<TooltipPrimitive.Root>
			<TooltipPrimitive.Trigger>
				{children}
			</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Content side={side} css={{
				borderRadius: 4,
				padding: '8px 14px',
				fontSize: 15,
				lineHeight: 1,
				color: '#000',
				backgroundColor: 'white',
				boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
				animationDuration: '400ms',
				animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
				animationFillMode: 'forwards',
				willChange: 'transform, opacity',
				'&[data-state="delayed-open"]': {
					'&[data-side="top"]': { animationName: slideDownAndFade },
					'&[data-side="right"]': { animationName: slideLeftAndFade },
					'&[data-side="bottom"]': { animationName: slideUpAndFade },
					'&[data-side="left"]': { animationName: slideRightAndFade },
				},
				'@media (prefers-reduced-motion: reduce)': {
					animation: "none!important"
				},
			}} sideOffset={5} >
				{title}
				<TooltipPrimitive.Arrow css={{ fill: "white" }} />
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Root>
	);
};

export default Tooltip;

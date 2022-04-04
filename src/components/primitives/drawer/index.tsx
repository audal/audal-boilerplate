/** @jsxImportSource @compiled/react */
import React from 'react';
import { keyframes } from '@compiled/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalCloseButton } from '../modal';
import { Cross1Icon } from '@radix-ui/react-icons';
import { overlayStyles } from './Overlay';
import { IconButton } from './IconButton';

const fadeIn = keyframes({
	from: { opacity: '0' },
	to: { opacity: '1' },
});

const fadeOut = keyframes({
	from: { opacity: '1' },
	to: { opacity: '0' },
});

type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

const DrawerOverlay = () => (
	<DialogPrimitive.Overlay css={{
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: "100%",
		height: "100%",
		background: "rgba(0, 0, 0, 0.48)",
		zIndex: 2000,
		'&[data-state="open"]': {
			animation: `${fadeIn} 250ms forwards`,
		},
		'&[data-state="closed"]': {
			animation: `${fadeOut} 350ms forwards`,
		},
		'@media (prefers-reduced-motion: reduce)': {
			animation: 'none!important',
		},
	}} />
)

interface DrawerContentProps{
	children: React.ReactNode | React.ReactNode[];
	className?: string;
	placement: 'left' | 'right' | 'top' | 'bottom';
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
export const DrawerContent : React.FC<DrawerContentProps> = ({children, className, placement='left', size='xs'}) => {

	const sizes = {
		xs: "20rem",
		sm: "24rem",
		md: "28rem",
		lg: "32rem",
		xl: "36rem",
		full: "100%"
	}[size];

	const placementStyles = {
		top: {
			transform: 'translate3d(0,-100%,0)',
			width: '100%',
			height: sizes,
			top: 0,
			bottom: 'auto',
			slideInFrom: 'translate3d(0,-100%,0)',
			slideInTo: 'translate3d(0,0,0)',
			slideOutFrom: 'translate3d(0,0,0)',
			slideOutTo: 'translate3d(0,-100%,0)'
		},
		right: {
			top: '0',
			transform: 'translate3d(100%,0,0)',
			right: 0,
			width: sizes,
			height: "100%",
			slideInFrom: 'translate3d(100%,0,0)',
			slideInTo: 'translate3d(0,0,0)',
			slideOutFrom: 'translate3d(0,0,0)',
			slideOutTo: 'translate3d(100%,0,0)'
		},
		bottom: {
			transform: 'translate3d(0,100%,0)',
			width: '100%',
			height: sizes,
			bottom: 0,
			top: 'auto',
			slideInFrom: 'translate3d(0,100%,0)',
			slideInTo: 'translate3d(0,0,0)',
			slideOutFrom: 'translate3d(0,0,0)',
			slideOutTo: 'translate3d(0,100%,0)'
		},
		left: {
			top: 0,
			transform: 'translate3d(0%,0,0)',
			left: 0,
			width: sizes,
			height: "100%", 
			slideInFrom: 'translate3d(-100%,0,0)',
			slideInTo: 'translate3d(0,0,0)',
			slideOutFrom: 'translate3d(0,0,0)',
			slideOutTo: 'translate3d(-100%,0,0)'
		},
	}[placement];
	
	const slideIn = keyframes({
		from: { transform: placementStyles?.slideInFrom },
		to: { transform: placementStyles?.slideInTo },
	});

	const slideOut = keyframes({
		from: { transform: placementStyles?.slideOutFrom },
		to: { transform: placementStyles?.slideOutTo },
	});

	return (
		<DialogPrimitive.Portal forceMount>
			<DrawerOverlay />
			<DialogPrimitive.Content
				css={{
					backgroundColor: 'white',
					boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					position: 'fixed',
					top: placementStyles?.top,
					bottom: placementStyles?.bottom,
					left: placementStyles?.left,
					right: placementStyles?.right,
					width: placementStyles?.width,
					height: placementStyles?.height,
					zIndex: 2000,
					'&[data-state="open"]': {
						animation: `${slideIn} 360ms forwards`,
					},
					'&[data-state="closed"]': {
						animation: `${slideOut} 250ms forwards`,
					},
				}}
				className={className}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
};

type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>;

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerCloseButton = ModalCloseButton;

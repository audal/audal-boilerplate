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
		backdropFilter: "blur(8px)",
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

const slideIn = keyframes({
	from: { transform: 'translate3d(-100%,0,0)' },
	to: { transform: 'translate3d(0,0,0)' },
});

const slideOut = keyframes({
	from: { transform: 'translate3d(0,0,0)' },
	to: { transform: 'translate3d(-100%,0,0)' },
});

export const DrawerContent = ({children, className, ...props}) => {

	// const placementStyles = {
	// 	top: {
	// 		transform: 'translate3d(0,-100%,0)',
	// 		width: '100%',
	// 		height: 300,
	// 		bottom: 'auto',
	// 	},
	// 	right: {
	// 		transform: 'translate3d(100%,0,0)',
	// 		right: 0,
	// 	},
	// 	bottom: {
	// 		transform: 'translate3d(0,100%,0)',
	// 		width: '100%',
	// 		height: 300,
	// 		bottom: 0,
	// 		top: 'auto',
	// 	},
	// 	left: {
	// 		transform: 'translate3d(0%,0,0)',
	// 		left: 0,
	// 	},
	// }[placement];

	return (
		<DialogPrimitive.Portal forceMount>
			<DrawerOverlay />
			<DialogPrimitive.Content
				css={{
					backgroundColor: 'white',
					boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					position: 'fixed',
					top: 0,
					bottom: 0,
					width: "320px",
					zIndex: 2000,
					// Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
					// Affects animated and non-animated dialogs alike.
					// willChange: 'transform',

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

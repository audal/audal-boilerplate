/** @jsxImportSource @compiled/react */
import React from 'react';
import { keyframes } from '@compiled/react';
// import { styled, keyframes, VariantProps, CSS } from '../stitches.config';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalCloseButton } from '../modal';
import { Cross1Icon } from '@radix-ui/react-icons';
import { overlayStyles } from './Overlay';
import { IconButton } from './IconButton';

const overlayShow = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const fadeIn = keyframes({
	from: { opacity: '0' },
	to: { opacity: '1' },
});

const fadeOut = keyframes({
	from: { opacity: '1' },
	to: { opacity: '0' },
});

type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export const DrawerOverlay = () => (
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
		animation: `${overlayShow} 150ms forwards`,
		'@media (prefers-reduced-motion: reduce)': {
			animation: 'none!important',
		},
		// '&[data-state="open"]': {
		// 	animation: `${fadeIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
		// },

		// '&[data-state="closed"]': {
		// 	animation: `${fadeOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
		// },
	}} />
)

const slideIn = keyframes({
	from: { transform: '$$transformValue' },
	to: { transform: 'translate3d(0,0,0)' },
});

const slideOut = keyframes({
	from: { transform: 'translate3d(0,0,0)' },
	to: { transform: '$$transformValue' },
});

export const DrawerContent = ({children, placement='left', ...props}) => {

	const placementStyles = {
		top: {
			transform: 'translate3d(0,-100%,0)',
			width: '100%',
			height: 300,
			bottom: 'auto',
		},
		right: {
			transform: 'translate3d(100%,0,0)',
			right: 0,
		},
		bottom: {
			transform: 'translate3d(0,100%,0)',
			width: '100%',
			height: 300,
			bottom: 0,
			top: 'auto',
		},
		left: {
			transform: 'translate3d(0%,0,0)',
			left: 0,
		},
	}[placement];
	
	return (
		<DialogPrimitive.Content 
		className="drawer-content-wrapper"
		style={placementStyles}			
		css={{
			backgroundColor: 'white',
			boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
			position: 'fixed',
			top: 0,
			bottom: 0,
			width: "320px",
			zIndex: 2000,
			transition: "transform 1s",
			// Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
			// Affects animated and non-animated dialogs alike.
			// willChange: 'transform',

			// '&[data-state="open"]': {
			// 	animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
			// },

			// '&[data-state="closed"]': {
			// 	animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
			// },

			// ...props
			}} 
		>
			{children}
		</DialogPrimitive.Content>
	);
};

// export const CustomTriggerButton = () => {
// 	retur
// }

// type SheetContentVariants = VariantProps<typeof StyledContent>;
type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>;
// type SheetContentProps = DialogContentPrimitiveProps & SheetContentVariants & { css?: CSS };

export const DrawerComponent = ({ children, contentPlacement, ...props }) => (
	<DialogPrimitive.Root>
		<DialogPrimitive.Trigger>
			<div>Edit Profile</div>
		</DialogPrimitive.Trigger>
		<DialogPrimitive.Portal>
			<DrawerOverlay />
			<DrawerContent placement={contentPlacement} {...props}>
				<ModalCloseButton />
				{children}
			</DrawerContent>
		</DialogPrimitive.Portal>
	</DialogPrimitive.Root>
	
);

export const SheetTrigger = DialogPrimitive.Trigger;
// export DrawerOverlay = DrawerOverlay;
export const DrawerCloseButton = ModalCloseButton;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

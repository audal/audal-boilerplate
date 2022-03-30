/** @jsxImportSource @compiled/react */
import React from 'react';
import { keyframes, cx } from '@compiled/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {DialogCloseProps, DialogContentImplProps} from "@radix-ui/react-dialog";

const overlayShow = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const contentShow = keyframes({
	'0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
	'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;

export const ModalContent = (props: CompiledJSXCustomProps<DialogContentImplProps>) => {

	console.log(props)

	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay css={{
				backgroundColor: "#0009",
				position: 'fixed',
				zIndex: 20,
				inset: 0,
				backdropFilter: "blur(8px)",
				animation: `${overlayShow} 150ms forwards`,
				'@media (prefers-reduced-motion: reduce)': {
					animation: 'none!important',
				},
			}} />
			<DialogPrimitive.Content css={{
				backgroundColor: 'white',
				borderRadius: 6,
				zIndex: 20,
				boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '90vw',
				maxWidth: '450px',
				maxHeight: '85vh',
				padding: 25,
				'@media (prefers-reduced-motion: no-preference)': {
					animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
				},
				'&:focus': { outline: 'none' },
			}} {...props} />
		</DialogPrimitive.Portal>
	);
};

export const ModalCloseButton = (props: CompiledJSXCustomProps<DialogCloseProps>) => {

	return (
		<DialogPrimitive.Close css={{
			position: 'absolute',
			fontFamily: 'inherit',
			borderRadius: '100%',
			height: 25,
			width: 25,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			top: 10,
			right: 10,
			transition: '0.2s',
			'&:hover': { backgroundColor: "#0001" },
			'&:focus': { boxShadow: `0 0 0 2px #0001` },
		}} {...props}>
			<Cross2Icon />
		</DialogPrimitive.Close>
	)
};

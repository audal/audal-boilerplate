import React from "react";
import { keyframes } from "@emotion/react";
import Cross2Icon from "../../../images/cross2icon.svg";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	DialogCloseProps,
	DialogContentImplProps,
} from "@radix-ui/react-dialog";

const overlayShow = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

const overlayHide = keyframes({
	"0%": { opacity: 1 },
	"100%": { opacity: 0 },
});

const contentShow = keyframes({
	"0%": { opacity: 0, transform: "translateY(10%)" },
	"20%": { opacity: 0, transform: "translateY(10%)" },
	"100%": { opacity: 1, transform: "translateY(0%)" },
});

const contentHide = keyframes({
	"0%": { opacity: 0, transform: "translateY(0%)" },
	"80%": { opacity: 0, transform: "translateY(10%)" },
	"100%": { opacity: 0, transform: "translateY(10%)" },
});

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;

/*This component houses the modal content */

export const ModalContent = (
	props: CompiledJSXCustomProps<DialogContentImplProps>
) => {
	return (
		<DialogPrimitive.Portal forceMount>
			<DialogPrimitive.Overlay
				css={{
					backgroundColor: "#04050399",
					position: "fixed",
					zIndex: 20,
					inset: 0,
					overflowY: "auto",
					display: "grid",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					justifyContent: "center",
					alignItems: "center",
					"&[data-state='open']": {
						animation: `${overlayShow} 250ms forwards`,
					},
					"&[data-state='closed']": {
						animation: `${overlayHide} 350ms forwards`,
					},
					"@media (prefers-reduced-motion: reduce)": {
						animation: "none!important",
					},
				}}
			>
				<DialogPrimitive.Content
					css={{
						backgroundColor: "white",
						borderRadius: 6,
						zIndex: 20,
						boxShadow:
							"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
						width: "90vw",
						maxWidth: "450px",
						maxHeight: "85vh",
						padding: 25,
						"&[data-state='open']": {
							animation: `${contentShow} 360ms forwards`,
						},
						"&[data-state='closed']": {
							animation: `${contentHide} 250ms forwards`,
						},
						"@media (prefers-reduced-motion: reduce)": {
							animation: "none!important",
						},
						"&:focus": { outline: "none" },
					}}
					{...props}
				/>
			</DialogPrimitive.Overlay>
		</DialogPrimitive.Portal>
	);
};

/* this component closes the modal */

export const ModalCloseButton = (
	props: CompiledJSXCustomProps<DialogCloseProps>
) => {
	return (
		<DialogPrimitive.Close
			className={props.className}
			css={{
				position: "absolute",
				fontFamily: "inherit",
				borderRadius: "100%",
				height: 25,
				width: 25,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				top: 10,
				right: 10,
				transition: "0.2s",
				"&:hover": { backgroundColor: "#04050311" },
				"&:focus": { boxShadow: `0 0 0 2px #04050311` },
			}}
			{...props}
		>
			<Cross2Icon width="100%" height="100%" />
		</DialogPrimitive.Close>
	);
};

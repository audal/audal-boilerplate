/** @jsxImportSource @compiled/react */
import React from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {keyframes} from "@compiled/react";
import {AccordionMultipleProps, AccordionSingleProps} from "@radix-ui/react-accordion";
import {IconProps} from "@radix-ui/react-icons/dist/types";

const slideDown = keyframes({
	from: { height: 0, opacity: 0 },
	to: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
});

const slideUp = keyframes({
	from: { height: 'var(--radix-accordion-content-height)' },
	to: { height: 0, opacity: 0 },
});

export type AccordionProps =  {
	allowMultiple?: boolean
} & (Omit<AccordionSingleProps, "type"> | Omit<AccordionMultipleProps, "type">)

/**
 * Primary accordion component. This wraps <AccordionItem /> instances.
 * @alias AccordionProps
 * */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({ allowMultiple = false, ...props }, ref) => (
	// @ts-ignore The regular typing for this is dreadful and restrictive.
	<AccordionPrimitive.Root ref={ref} type={allowMultiple ? "multiple" : "single"} {...props} />
));


export type AccordionItemProps = AccordionPrimitive.AccordionItemProps
/**
 * A single instance of an Accordion (i.e. one collapsible section).
 * This must be used within an <Accordion /> component to function correctly.
 * @alias AccordionItemProps
 * */
export const AccordionItem = (props: AccordionItemProps): JSX.Element => {
	return (
		<AccordionPrimitive.AccordionItem {...props} />
	)
}


export type AccordionButtonProps = AccordionPrimitive.AccordionTriggerProps
/**
 * This will open the accordion. Use the asChild prop (set to true) to
 * use your own fully custom button if necessary.
 * This must be used within an <AccordionItem /> instance.
 * @alias AccordionButtonProps
 * */
export const AccordionButton = React.forwardRef<HTMLButtonElement, AccordionButtonProps>((props, ref) => {
	return (
		<AccordionPrimitive.AccordionTrigger ref={ref} css={{
			width: "100%",
			textAlign: "left"
		}} {...props} />
	)
})

export type AccordionPanelProps = AccordionPrimitive.AccordionContentProps
/**
 * This is the content area that will expand when the accordion is opened.
 * This must be used within an <AccordionItem /> instance.
 * @alias AccordionPanelProps
 * */
export const AccordionPanel = React.forwardRef<HTMLDivElement, AccordionPanelProps>((props, ref) => {
	return (
		<AccordionPrimitive.Content ref={ref} css={{
			overflow: "hidden",
			width: "100%",
			'&[data-state="open"]': {
				animation: `${slideDown} 400ms forwards`,
			},
			'&[data-state="closed"]': {
				animation: `${slideUp} 400ms forwards`,
			},
			'@media (prefers-reduced-motion: reduce)': {
				animation: 'none!important'
			}
		}} {...props} />
	)
})

export type AccordionIconProps = IconProps
/**
 * This is an open/close caret icon that will rotate when the accordion
 * is opened or closed.
 * This must be used within an <AccordionItem /> instance.
 * @alias AccordionIconProps
 * */
export const AccordionIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {

	return (
		<ChevronDownIcon ref={ref} css={{
			transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
			'@media (prefers-reduced-motion: reduce)': {
				transition: 'none!important'
			},
			'[data-state=open] &': { transform: 'rotate(180deg)' },
		}} {...props} />
	)
})

export default Accordion

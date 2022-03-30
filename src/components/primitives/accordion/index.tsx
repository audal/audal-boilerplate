/** @jsxImportSource @compiled/react */
import React from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {keyframes} from "@compiled/react";

const slideDown = keyframes({
	from: { height: 0, opacity: 0 },
	to: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
});

const slideUp = keyframes({
	from: { height: 'var(--radix-accordion-content-height)' },
	to: { height: 0, opacity: 0 },
});

export const Accordion = ({ allowMultiple = false, defaultIndex, children }) => (
	<AccordionPrimitive.Root type={allowMultiple ? "multiple" : "single"} defaultValue="item-1" collapsible>
		{children}
	</AccordionPrimitive.Root>
);

export const AccordionItem = ({ children }) => {
	return (
		<AccordionPrimitive.AccordionItem value="item-2">
			{children}
		</AccordionPrimitive.AccordionItem>
	)
}

export const AccordionButton = ({ children }) => {
	return (
		<AccordionPrimitive.AccordionTrigger css={{
			width: "100%",
			textAlign: "left"
		}}>{children}</AccordionPrimitive.AccordionTrigger>
	)
}

export const AccordionPanel = ({ children }) => {
	return (
		<AccordionPrimitive.Content css={{
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
		}}>

			{children}
		</AccordionPrimitive.Content>
	)
}

export const AccordionIcon = () => {

	return (
		<ChevronDownIcon css={{
			transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
			'@media (prefers-reduced-motion: reduce)': {
				transition: 'none!important'
			},
			'[data-state=open] &': { transform: 'rotate(180deg)' },
		}} />
	)
}

/** @jsxImportSource @compiled/react */
import React from 'react';
import {keyframes} from "@compiled/react";
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import {
	NavigationMenuContentProps, NavigationMenuItemProps,
	NavigationMenuLinkProps, NavigationMenuListProps, NavigationMenuSubProps, NavigationMenuTriggerProps,
	NavigationMenuViewportImplProps,
} from "@radix-ui/react-navigation-menu";



const enterFromRight = keyframes({
	from: { transform: 'translateX(200px)', opacity: 0 },
	to: { transform: 'translateX(0)', opacity: 1 },
});

const enterFromLeft = keyframes({
	from: { transform: 'translateX(-200px)', opacity: 0 },
	to: { transform: 'translateX(0)', opacity: 1 },
});

const exitToRight = keyframes({
	from: { transform: 'translateX(0)', opacity: 1 },
	to: { transform: 'translateX(200px)', opacity: 0 },
});

const exitToLeft = keyframes({
	from: { transform: 'translateX(0)', opacity: 1 },
	to: { transform: 'translateX(-200px)', opacity: 0 },
});

const scaleIn = keyframes({
	from: { height: 0, opacity: 0 },
	to: { height: 'var(--radix-navigation-menu-viewport-height)', opacity: 1 },
});

const scaleOut = keyframes({
	from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
	to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
});

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

/*
**** This short demo shows how the navigation should be used
<MegaMenu>
			  <MegaMenuDropdown>
				  <MenuList>
					  <MenuItem >
						  <DropdownTrigger>
							  Learn
							  <DropdownTriggerIndicator/>
						  </DropdownTrigger>
						  <DropdownInsert>
							  <SubMenu>
								  <MenuList>
									  <MenuItem>
										  <DropdownTrigger>
											  Hello
										  </DropdownTrigger>
										  <DropdownInsert>
											  <MenuLink>
												  Github
											  </MenuLink>
										  </DropdownInsert>
									  </MenuItem>
								  </MenuList>
							  </SubMenu>
						  </DropdownInsert>
					  </MenuItem>

					  <MenuItem>
						  <DropdownTrigger>
							  Overview
						  </DropdownTrigger>
						  <DropdownInsert>
							  <MenuLink>
								  Github
							  </MenuLink>
						  </DropdownInsert>
					  </MenuItem>

					  <MenuItem>
						  <MenuLink>
							  Github
						  </MenuLink>
					  </MenuItem>

					  <MegaMenuIndicator />

				  </MenuList>
			  </MegaMenuDropdown>
	      </MegaMenu>
*/

const itemStyles = {
	padding: '8px 12px',
	outline: 'none',
	userSelect: 'none',
	fontWeight: 500,
	lineHeight: 1,
	borderRadius: 4,
	fontSize: 15,
	color: 'black',
	'&:focus': { position: 'relative', boxShadow: `` },
	'&:hover': { backgroundColor: `` },
};


/* 
This is the drop down icon

*/

export const DropdownTriggerIndicator = ({ className, style }: CompiledJSXPropsOmitRef<{ className?: string }>): JSX.Element => (
	<CaretDownIcon
		aria-hidden
		className={className}
		css={{
			position: 'relative',
			color: 'black',
			top: 1,
			transition: 'transform 250ms ease',
			'[data-state=open] &': { transform: 'rotate(-180deg)' },

		}}
		style={style}
	/>
)

/* 

Megamenu indicator controls the styling of the mega menu content

*/

export const MegaMenuIndicator = ({className, ...props}: CompiledJSXPropsOmitRef<HTMLDivElement>): JSX.Element => (
	<NavigationMenuPrimitive.Indicator
		className={className}
		css={{
			display: 'flex',
			alignItems: 'flex-end',
			justifyContent: 'center',
			height: 10,
			top: '100%',
			overflow: 'hidden',
			zIndex: 1,
			transition: 'width, transform 250ms ease',
			'&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
			'&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
		}}
		{...props}
	>
		<div
			css={{
				position: 'relative',
				top: '70%',
				backgroundColor: 'white',
				width: 10,
				height: 10,
				transform: 'rotate(45deg)',
				borderTopLeftRadius: 2,
			}}
		/>
	</NavigationMenuPrimitive.Indicator>
)


/* 
These triggers open up the submenu
*/
export const DropdownTrigger = ({ className, ...props }: CompiledJSXCustomProps<NavigationMenuTriggerProps>): JSX.Element => (
	<NavigationMenuPrimitive.Trigger
		className={className}
		css={{
			...itemStyles,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 2,
			cursor: 'pointer'
		}}
		{...props}
	/>
)


/* 
This is the root of the mega menu
*/

export const MegaMenu = React.forwardRef<HTMLDivElement, CompiledJSXCustomProps<NavigationMenuPrimitive.NavigationMenuProps>>(({className, ...props}, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={className}
		css={{
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			width: '100vw',
			zIndex: 1,
		}}
		{...props}
	/>
))

MegaMenu.displayName = "MegaMenu"

/* 
 Subroot of the mega menu that houses the menu components
*/

export const MegaMenuDropdown = React.forwardRef<HTMLDivElement, CompiledJSXCustomProps<Omit<NavigationMenuViewportImplProps, 'activeContentValue'>>>(({className, children, ...props }, ref) => (
	<>
		{children}
		<div
			css={{
				position: 'absolute',
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
				top: '100%',
				left: 0,
				perspective: '2000px',
			}}
		>
			<NavigationMenuPrimitive.Viewport
				ref={ref}
				className={className}
				css={{
					position: 'relative',
					transformOrigin: 'top center',
					marginTop: 10,
					width: '100%',
					backgroundColor: 'white',
					overflow: 'hidden',
					height: 'var(--radix-navigation-menu-viewport-height)',
					'@media only screen and (min-width: 600px)': {
						width: 'var(--radix-navigation-menu-viewport-width)',
					},
					transition: 'width, height, 300ms ease',
					'&[data-state="open"]': { animation: `${scaleIn} 400ms ease` },
					'&[data-state="closed"]': { animation: `${scaleOut} 300ms ease` },
					'@media (prefers-reduced-motion: reduce)': {
						animation: 'none!important',
					},
				}}
				{...props}
			/>
		</div>
	</>
))

MegaMenuDropdown.displayName = "MegaMenuDropdown"

/* 
 This menu is used for menu items that have a link, external or internal
*/
export const MenuLink = React.forwardRef<HTMLAnchorElement, CompiledJSXCustomProps<NavigationMenuLinkProps>>(({className, ...props, link}, ref) => (
	<NavigationMenuPrimitive.Link
		ref={ref}
		href={link}
		className={className}
		css={{
			...itemStyles,
			display: 'block',
			textDecoration: 'none',
			fontSize: 15,
			lineHeight: 1,
		}}
		{...props}
	/>
))


/* this component is used for menu items that have no links */

export const MenuItem = ({className, ...props}: CompiledJSXCustomProps<NavigationMenuItemProps>): JSX.Element => {
	return (
		<NavigationMenuPrimitive.Item className={className} {...props}/>
	)
}

/* This is also a subroot. Comes after mega menu dropdown. */

export const MenuList = ({className, ...props}: CompiledJSXCustomProps<NavigationMenuListProps>): JSX.Element => {
	return (
		<NavigationMenuPrimitive.List
			className={className}
			css={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				backgroundColor: 'white',
				listStyle: 'none',

			}}
			{...props}
		/>
	)
}

/* This component acts as the root for the submenu*/

export const DropdownInsert = ({className, ...props}: CompiledJSXCustomProps<NavigationMenuContentProps>): JSX.Element => {
	return (
		<NavigationMenuPrimitive.Content
			className={className}
			css={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				backgroundColor: 'white',
				'&[data-motion="from-start"]': { animationName: enterFromLeft },
				'&[data-motion="from-end"]': { animationName: enterFromRight },
				'&[data-motion="to-start"]': { animationName: exitToLeft },
				'&[data-motion="to-end"]': { animationName: exitToRight },
				animationDuration: '250ms',
				animationTimingFunction: 'ease',
				'@media only screen and (min-width: 600px)': {
					width: '100vw',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',

				},
				transition: 'width, height, 300ms ease',
				'&[data-state="open"]': { animation: `${fadeIn} 400ms ease` },
				'&[data-state="closed"]': { animation: `${fadeOut} 300ms ease` },
				'@media (prefers-reduced-motion: reduce)': {
					animation: 'none!important',
				},

			}}
			{...props}
		/>
	)
}


/*This component houses the submenu and all its components */


export const SubMenu = ({ className, ...props }: CompiledJSXCustomProps<NavigationMenuSubProps>): JSX.Element =>  (
	<NavigationMenuPrimitive.Sub
		className={className}
		css={{
			margin: 0,
			listStyle: 'none',
			"& div:first-child": {
				position: "unset!important"
			}
		}}
		{...props}
	/>
)





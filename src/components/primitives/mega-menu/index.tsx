/** @jsxImportSource @compiled/react */
import React from 'react';
import { styled, keyframes } from '@stitches/react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { violet, mauve, indigo, purple, blackA } from '@radix-ui/colors';

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
	from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
	to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
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



const StyledTriggerWithCaret = React.forwardRef(({ children, ...props }, forwardedRef) => (
	<NavigationMenuPrimitive.Trigger 
	{...props} 
	ref={forwardedRef}
	css={{ 
	...itemStyles,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 2,
	}}
	>
		{children}
		<CaretDownIcon 
		aria-hidden 
		css={{ 
			position: 'relative',
			color: 'black',
			top: 1,
			'[data-state=open] &': { transform: 'rotate(-180deg)' },
			'@media (prefers-reduced-motion: no-preference)': {
				transition: 'transform 250ms ease',
			},
		}}
		/>
	</NavigationMenuPrimitive.Trigger >
));







const StyledIndicatorWithArrow = React.forwardRef((props, forwardedRef) => (
	<NavigationMenuPrimitive.Indicator 
	{...props} 
	ref={forwardedRef}
	css={{ 
		display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	height: 10,
	top: '100%',
	overflow: 'hidden',
	zIndex: 1,

	'@media (prefers-reduced-motion: no-preference)': {
		transition: 'width, transform 250ms ease',
		'&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
		'&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
	},
	}}
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
));




const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuIndicator = StyledIndicatorWithArrow;



const ContentListItem = React.forwardRef(({ children, title, ...props }, forwardedRef) => (
	<li
	css={{
		padding: 12,
		borderRadius: 6,
		'&:hover': { backgroundColor: 'grey' },
	}}
	>
		<NavigationMenuPrimitive.Link
			{...props}
			ref={forwardedRef}
			
		>
			<div
			css={{
				fontWeight: 500,
				lineHeight: 1.2,
				marginBottom: 5,
				color: violet.violet12,
			}}
			>
				{title}
			</div>
			<p
			css={{
				all: 'unset',
				color: mauve.mauve11,
				lineHeight: 1.4,
				fontWeight: 'initial',
			}}
			>
				{children}
			</p>
		</NavigationMenuPrimitive.Link>
	</li>
));

const ContentListItemCallout = React.forwardRef(({ children, ...props }, forwardedRef) => (
	<li css={{ gridRow: 'span 3' }}>
		<NavigationMenuPrimitive.Link
			{...props}
			href="/"
			ref={forwardedRef}
			css={{
				display: 'flex',
				justifyContent: 'flex-end',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				background: ``,
				borderRadius: 6,
				padding: 25,
			}}
		>
			<svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
				<path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
				<path d="M12 0H4V8H12V0Z"></path>
				<path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
			</svg>
			<div
				css={{
					fontSize: 18,
					color: 'white',
					marginTop: 16,
					marginBottom: 7,
				}}
			>
				Radix Primitives
			</div>
			<p
				css={{
					fontSize: 14,
					color: mauve.mauve4,
					lineHeight: 1.3,
				}}
			>
				Unstyled, accessible components for React.
			</p>
		</NavigationMenuPrimitive.Link>
	</li>
));



export const NavigationMenuDemo = () => {
	return (
		<NavigationMenuPrimitive.Root
		css={{
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			width: '100vw',
			zIndex: 1,
		}}
		
		>
			<NavigationMenuPrimitive.List
			css={{
				
				display: 'flex',
				justifyContent: 'center',
				backgroundColor: 'white',
				padding: 4,
				borderRadius: 6,
				listStyle: 'none',
				boxShadow: `0 2px 10px ${blackA.blackA7}`,
			}}
			>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Learn</NavigationMenuTrigger>
					<NavigationMenuPrimitive.Content
					css={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						'@media only screen and (min-width: 600px)': { width: 'auto' },
						'@media (prefers-reduced-motion: no-preference)': {
							animationDuration: '250ms',
							animationTimingFunction: 'ease',
							'&[data-motion="from-start"]': { animationName: enterFromLeft },
							'&[data-motion="from-end"]': { animationName: enterFromRight },
							'&[data-motion="to-start"]': { animationName: exitToLeft },
							'&[data-motion="to-end"]': { animationName: exitToRight },
						},
					}}
					>
						<ul
						css={{
							display: 'grid',
							padding: 22,
							margin: 0,
							columnGap: 10,
							listStyle: 'none',
							'@media only screen and (min-width: 600px)': {
								width: 500,
								gridTemplateColumns: '.75fr 1fr',
							},
						}}
						>
							<ContentListItemCallout />
							<ContentListItem href="https://stitches.dev/" title="Stitches">
								CSS-in-JS with best-in-class developer experience.
							</ContentListItem>
							<ContentListItem href="/colors" title="Colors">
								Beautiful, thought-out palettes with auto dark mode.
							</ContentListItem>
							<ContentListItem href="https://icons.modulz.app/" title="Icons">
								A crisp set of 15x15 icons, balanced and consistent.
							</ContentListItem>
						</ul>
					</NavigationMenuPrimitive.Content>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>Overview</NavigationMenuTrigger>
					<NavigationMenuPrimitive.Content
					css={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						'@media only screen and (min-width: 600px)': { width: 'auto' },
						'@media (prefers-reduced-motion: no-preference)': {
							animationDuration: '250ms',
							animationTimingFunction: 'ease',
							'&[data-motion="from-start"]': { animationName: enterFromLeft },
							'&[data-motion="from-end"]': { animationName: enterFromRight },
							'&[data-motion="to-start"]': { animationName: exitToLeft },
							'&[data-motion="to-end"]': { animationName: exitToRight },
						},
					}}
					>
						<ul 
						css={{
							display: 'grid',
							padding: 22,
							margin: 0,
							columnGap: 10,
							listStyle: 'none',
							'@media only screen and (min-width: 600px)': {
								width: 600,
								gridAutoFlow: 'column',
								gridTemplateRows: 'repeat(3, 1fr)',
							},

							
						}}
						>
							<ContentListItem title="Introduction" href="/docs/primitives/overview/introduction">
								Build high-quality, accessible design systems and web apps.
							</ContentListItem>
							<ContentListItem
								title="Getting started"
								href="/docs/primitives/overview/getting-started"
							>
								A quick tutorial to get you up and running with Radix Primitives.
							</ContentListItem>
							<ContentListItem title="Styling" href="/docs/primitives/overview/styling">
								Unstyled and compatible with any styling solution.
							</ContentListItem>
							<ContentListItem title="Animation" href="/docs/primitives/overview/animation">
								Use CSS keyframes or any animation library of your choice.
							</ContentListItem>
							<ContentListItem title="Accessibility" href="/docs/primitives/overview/accessibility">
								Tested in a range of browsers and assistive technologies.
							</ContentListItem>
							<ContentListItem title="Releases" href="/docs/primitives/overview/releases">
								Radix Primitives releases and their changelogs.
							</ContentListItem>
						</ul>
					</NavigationMenuPrimitive.Content>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuPrimitive.Link
					href="https://github.com/radix-ui"
					css={{
						...itemStyles,
						display: 'block',
						textDecoration: 'none',
						fontSize: 15,
						lineHeight: 1,
					}}
					>
						Github
					</NavigationMenuPrimitive.Link>
				</NavigationMenuItem>

				<NavigationMenuIndicator />
			</NavigationMenuPrimitive.List>

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
				css={{
					position: 'relative',
					transformOrigin: 'top center',
					marginTop: 10,
					width: '100%',
					backgroundColor: 'white',
					borderRadius: 6,
					overflow: 'hidden',
					boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
					height: 'var(--radix-navigation-menu-viewport-height)',
				
					'@media only screen and (min-width: 600px)': {
						width: 'var(--radix-navigation-menu-viewport-width)',
					},
					'@media (prefers-reduced-motion: no-preference)': {
						transition: 'width, height, 300ms ease',
						'&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
						'&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
					},
				}}
				/>
			</div>
		</NavigationMenuPrimitive.Root>
	);
};

export default NavigationMenuDemo;

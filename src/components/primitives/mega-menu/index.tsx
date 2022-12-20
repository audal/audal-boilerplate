import React from 'react';
import { keyframes } from '@emotion/react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
// import CaretDownIcon  from '../../../images/caret-down-icon.svg';
import {
    NavigationMenuContentProps, NavigationMenuItemProps,
    NavigationMenuLinkProps, NavigationMenuListProps, NavigationMenuSubProps, NavigationMenuTriggerProps,
    NavigationMenuViewportImplProps,
} from '@radix-ui/react-navigation-menu';

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
    outline: 'none',
    userSelect: 'none',
};

/*
This is the drop down icon
*/

/* export const DropdownTriggerIndicator = ({ className, style }: HtmlPropsNoRef<{ className?: string }>): JSX.Element => (
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
) */

/*
Megamenu indicator controls the styling of the mega menu content
*/

export const MegaMenuIndicator = ({ className, ...props }: HtmlPropsNoRef<HTMLDivElement>): JSX.Element => (
    <NavigationMenuPrimitive.Indicator
        className={className}
        css={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height: '6px',
            top: '100%',
            overflow: 'hidden',
            zIndex: 1,
            marginTop: '-6px',
            transition: 'width, transform 250ms ease',
            '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
            '&[data-state="hidden"]': { transition: 'none', animation: `${fadeOut} 200ms ease` },
        }}
        {...props}
    >
        <div
            css={{
                position: 'relative',
                top: '-20',
                backgroundColor: '#9db8d1',
                width: '100%',
                height: '2.5px',
            }}
        />
    </NavigationMenuPrimitive.Indicator>
);

/*
These triggers open up the submenu
*/
export const DropdownTrigger = ({ className, ...props }: CustomProps<NavigationMenuTriggerProps>): JSX.Element => (
    <NavigationMenuPrimitive.Trigger
        className={className}
        css={{
            ...itemStyles,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
        }}
        {...props}
    />
);

/*
This is the root of the mega menu
*/

export const MegaMenu = React.forwardRef<
HTMLDivElement, CustomProps<NavigationMenuPrimitive.NavigationMenuProps
>>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
        ref={ref}
        className={className}
        css={{
            // position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            zIndex: 1,
            '> div': {
                width: '100%',
            },
            '> div > div': {
                width: '100%',
                height: '100%',
                // position: "unset!important",
                '@media (max-width: 991px)': { width: 'auto' },
            },
        }}
        {...props}
    />
));

MegaMenu.displayName = 'MegaMenu';

/*
 Subroot of the mega menu that houses the menu components
*/

export const MegaMenuDropdown = React.forwardRef<HTMLDivElement, CustomProps<Omit<NavigationMenuViewportImplProps, 'activeContentValue'>>>(({ className, children, ...props }, ref) => (
    <>
        {children}
        {/* <div
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
					width: '100%',
					backgroundColor: 'white',
					overflow: 'hidden',
					height: 'var(--radix-navigation-menu-viewport-height)',
					'@media only screen and (min-width: 600px)': {
						width: 'var(--radix-navigation-menu-viewport-width)',
					},
					marginTop: '1px',
					transition: 'width, height, 300ms ease',
					'&[data-state="open"]': { animation: `${scaleIn} 400ms ease` },
					'&[data-state="closed"]': { animation: `${scaleOut} 400ms ease` },
					'@media (prefers-reduced-motion: reduce)': {
						animation: 'none!important',
					},
				}}
				{...props}
			/>
		</div> */}
    </>
));

MegaMenuDropdown.displayName = 'MegaMenuDropdown';

/*
 This menu is used for menu items that have a link, external or internal
*/
export const MenuLink = React.forwardRef<HTMLAnchorElement, CustomProps<NavigationMenuLinkProps>>(({ className, link, ...props }, ref) => (
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
));

/* this component is used for menu items that have no links */

export const MenuItem = ({ className, ...props }: CustomProps<NavigationMenuItemProps>): JSX.Element => (
    <NavigationMenuPrimitive.Item className={className} {...props} />
);

/* This is also a subroot. Comes after mega menu dropdown. */

export const MenuList = ({ className, ...props }: CustomProps<NavigationMenuListProps>): JSX.Element => (
    <NavigationMenuPrimitive.List

        className={className}
        css={{
            width: 'auto',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            listStyle: 'none',
            height: '100%',
        }}
        {...props}
    />
);

/* This component acts as the root for the submenu */

export const DropdownInsert = ({ className, ...props }: CustomProps<NavigationMenuContentProps>): JSX.Element => (
    <NavigationMenuPrimitive.Content
        className={className}
        css={{
            position: 'absolute',
            left: 0,
            top: '100%',
            width: '100%',
            // height: '100%',
            backgroundColor: 'white',
            '&[data-motion="from-start"]': { animationName: enterFromLeft },
            '&[data-motion="from-end"]': { animationName: enterFromRight },
            '&[data-motion="to-start"]': { animationName: exitToLeft },
            '&[data-motion="to-end"]': { animationName: exitToRight },
            animationDuration: '250ms',
            animationTimingFunction: 'ease',
            '@media only screen and (min-width: 600px)': {
                width: '100%',
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
);

/* This component houses the submenu and all its components */

export const SubMenu = ({ className, ...props }: CustomProps<NavigationMenuSubProps>): JSX.Element => (
    <NavigationMenuPrimitive.Sub
        className={className}
        css={{
            width: '100%',
            margin: 0,
            listStyle: 'none',
            '& div:first-child': {
                position: 'unset!important',
            },
        }}
        {...props}
    />
);

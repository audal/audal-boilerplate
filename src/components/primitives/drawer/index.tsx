import React from 'react';
import { keyframes } from '@emotion/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalCloseButton } from '../modal';
import usePartialAtBreakpoint from '../grid/use-partial-at-breakpoint';

const fadeIn = keyframes({
    from: { opacity: '0' },
    to: { opacity: '1' },
});

const fadeOut = keyframes({
    from: { opacity: '1' },
    to: { opacity: '0' },
});

/**
 * Drawer Overlay component -does not accept any props
 */
const DrawerOverlay: () => React.ReactElement = () => (
    <DialogPrimitive.Overlay
        css={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.1)',
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
        }}
    />
);

type PlacementPosition = 'top' | 'bottom' | 'left' | 'right';

interface DrawerContentProps {
    /**
     *  * The content of the drawer in JSX
     *  */
    children: React.ReactNode | React.ReactNode[];
    /**
     *  * This can either be an explicit className or
     *  * classNames generated as a result of using css prop
     *  * i.e. css={{width: "100%", height: "auto"}}
     *  *
     *  * You can use css prop to style the drawer content. e.g. if you want to change
     *  * the background color from white to any other color
     *  */
    className?: string;
    /**
     *  * Positioning of the drawer. The default value is left
     *  */
    placement: PlacementPosition | { [key: string]: PlacementPosition }
    /**
     *  * The size of the drawer. For horizontally positioned drawers (i.e. left, right), this will affect the width.
     *  * For vertically positioned drawers, this will affect the height(i.e. top, bottom). THe default value is xs
     *  */
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

    container?: HTMLElement

    animation?: 'slide' | 'fade'
}

interface DrawerCloseProps {
    /**
     *  * The content of the drawer in JSX
     *  */
    children: React.ReactNode | React.ReactNode[];
}

/**
 * <DrawerContent /> Component. It has a white background by default.
 * It must be a direct child of the <Drawer /> component
 * You can
 * @param {CustomProps<DrawerContentProps>}
 * @returns {React.ReactElement}
 *
 *
 *
 *
 */

export const DrawerCloseOnClick: React.FunctionComponent<DrawerCloseProps> = ({ children }: DrawerCloseProps) => (
    <DialogPrimitive.Close asChild>{children}</DialogPrimitive.Close>);

const buildInAnimation = (animation: any): string => `${keyframes(animation)} 360ms forwards`;

const buildOutAnimation = (animation: any): string => `${keyframes(animation)} 250ms forwards`;

export const DrawerContent = ({
    children,
    className,
    placement = 'bottom',
    size = 'xs',
    container,
    animation = 'slide',
}: CustomProps<DrawerContentProps>): React.ReactElement => {
    const sizes = {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        full: '100%',
    }[size];

    const placementStyles = usePartialAtBreakpoint(placement, {
        top: {
            transform: animation === 'slide' && 'translate3d(0,-100%,0)',
            width: '100%',
            height: sizes,
            top: 0,
            bottom: 'auto',
        },
        right: {
            top: '0',
            transform: animation === 'slide' && 'translate3d(100%,0,0)',
            right: 0,
            width: sizes,
            height: '100%',
        },
        bottom: {
            transform: animation === 'slide' && 'translate3d(0,100%,0)',
            width: '100%',
            height: sizes,
            bottom: 0,
            top: 'auto',
        },
        left: {
            top: 0,
            transform: animation === 'slide' && 'translate3d(0%,0,0)',
            left: 0,
            width: sizes,
            height: '100%',
        },
    });

    const animations = {
        slide: {
            top: {
                in: {
                    from: { transform: 'translate3d(0,-100%,0)' },
                    to: { transform: 'translate3d(0,0,0)' },
                },
                out: {
                    from: { transform: 'translate3d(0,0,0)' },
                    to: { transform: 'translate3d(0,-100%,0)' },
                },
            },
            right: {
                in: {
                    from: { transform: 'translate3d(100%,0,0)' },
                    to: { transform: 'translate3d(0,0,0)' },
                },
                out: {
                    from: { transform: 'translate3d(0,0,0)' },
                    to: { transform: 'translate3d(100%,0,0)' },
                },
            },
            bottom: {
                in: {
                    from: { transform: 'translate3d(0,100%,0)' },
                    to: { transform: 'translate3d(0,0,0)' },
                },
                out: {
                    from: { transform: 'translate3d(0,0,0)' },
                    to: { transform: 'translate3d(0,100%,0)' },
                },
            },
            left: {
                in: {
                    from: { transform: 'translate3d(-100%,0,0)' },
                    to: { transform: 'translate3d(0,0,0)' },
                },
                out: {
                    from: { transform: 'translate3d(0,0,0)' },
                    to: { transform: 'translate3d(-100%,0,0)' },
                },
            },
        },
        fade: {
            ...Object.fromEntries(['top', 'bottom', 'left', 'right'].map(key => [key, {
                in: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                out: {
                    from: { opacity: '1' },
                    to: { opacity: '0' },
                },
            }])),
        },
    }[animation];

    const animationStylesIn = usePartialAtBreakpoint(placement, animations, 'in');
    const animationStylesOut = usePartialAtBreakpoint(placement, animations, 'out');

    return (
        <DialogPrimitive.Portal forceMount container={container}>
            <DrawerOverlay />
            <DialogPrimitive.Content
                css={{
                    backgroundColor: 'white',
                    boxShadow:
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    position: 'fixed',
                    ...placementStyles,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    zIndex: 2000,
                    '&[data-state="open"]': {
                        // animation: `${slideIn} 360ms forwards`,
                        ...Object.fromEntries(Object.entries(animationStylesIn).map(([query, animation]) => [query, { animation: buildInAnimation(animation) }])),
                    },
                    '&[data-state="closed"]': {
                        ...Object.fromEntries(Object.entries(animationStylesOut).map(([query, animation]) => [query, { animation: buildOutAnimation(animation) }])),
                        // animation: `${slideOut} 250ms forwards`,
                    },
                }}
                className={className}
            >
                {children}
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    );
};

type DialogRootPrimitiveProps = React.FunctionComponent<
React.ComponentProps<typeof DialogPrimitive.Root>
>;
type DialogTriggerPrimitiveProps = React.FunctionComponent<
React.ComponentProps<typeof DialogPrimitive.Trigger>
>;
type DrawerCloseButtonProps = React.FunctionComponent<
React.ComponentProps<typeof ModalCloseButton>
>;

/**
 * <Drawer /> component - This is the root component that houses
 * both the DrawerTrigger and DrawerContent component when creating a Drawer
 *
 */
export const Drawer: DialogRootPrimitiveProps = DialogPrimitive.Root;
/**
 * <DrawerTrigger /> component - This is the button that opens the Drawer when clicked
 * It must have a child that determines the look of the button
 * (i.e. text and styling), preferably a div element which can be styled using css prop.
 *
 * This button must be a direct child of the <Drawer /> component
 *
 */
export const DrawerTrigger: DialogTriggerPrimitiveProps = DialogPrimitive.Trigger;
/**
 * <DrawerCloseButton /> component.
 * This component must always be the first child of <DrawerContent /> component.
 * You can modify the style with css prop e.g. css={{width: "100px", height: "100px"}}
 */
export const DrawerCloseButton: DrawerCloseButtonProps = ModalCloseButton;

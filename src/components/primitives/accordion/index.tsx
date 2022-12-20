import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes } from '@emotion/react';
import {
    AccordionMultipleProps,
    AccordionSingleProps,
} from '@radix-ui/react-accordion';
import ChevronDownIcon from '../../../images/cheveron-down-icon.svg';
import ArrowRightIcon from '../../../images/arrow-right-light.svg';

const slideDown = keyframes({
    '0%': { height: 0, opacity: 0 },
    '99%': { height: 'var(--radix-accordion-content-height)', opacity: 1 },
    '100%': { '--radix-collapsible-content-height': '100%!important' },
});

const slideUp = keyframes({
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: 0, opacity: 0 },
});

export type AccordionProps = CustomProps<
{
    /** Allow multiple accordions open at one time. Default is false.* */
    allowMultiple?: boolean;
    /** Allow toggling any accordion open and close, versus forcing the last-interacted Default is true.* */
    allowToggle?: boolean;
    /** Default accordion to have opened.* */
    defaultIndex?: number;
} & (
    | Omit<AccordionSingleProps, 'type'>
    | Omit<AccordionMultipleProps, 'type'>
)
>;

/**
 * Primary accordion component. This wraps <AccordionItem /> instances.
 * @alias AccordionProps
 * */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    (
        {
            allowMultiple = false,
            allowToggle = true,
            defaultIndex,
            children,
            className,
        },
        ref,
    ) => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
        <AccordionPrimitive.Root
            className={className}
            ref={ref}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            type={allowMultiple ? 'multiple' : 'single'}
            collapsible={allowToggle}
            defaultValue={defaultIndex ? `accordion-${defaultIndex}` : undefined}
        >
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as any, {
                        value: `accordion-${index}`,
                    });
                }
                return null;
            })}
        </AccordionPrimitive.Root>
    ),
);
Accordion.displayName = 'Accordion';

export type AccordionItemProps = CustomProps<
Omit<AccordionPrimitive.AccordionItemProps, 'value'>
>;
/**
 * A single instance of an Accordion (i.e. one collapsible section).
 * This must be used within an <Accordion /> component to function correctly.
 * @alias AccordionItemProps
 * */
export const AccordionItem = (props: AccordionItemProps): JSX.Element => (
    <AccordionPrimitive.AccordionItem
        {...(props as AccordionPrimitive.AccordionItemProps)}
    />
);

export type AccordionButtonProps = CustomProps<
AccordionPrimitive.AccordionTriggerProps
>;
/**
 * This will open the accordion. Use the asChild prop (set to true) to
 * use your own fully custom button if necessary.
 * This must be used within an <AccordionItem /> instance.
 * @alias AccordionButtonProps
 * */
export const AccordionButton = React.forwardRef<
HTMLButtonElement,
AccordionButtonProps
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.AccordionTrigger
        ref={ref}
        css={{
            width: '100%',
            textAlign: 'left',
        }}
        className={className}
        {...props}
    />
));

AccordionButton.displayName = 'AccordionButton';
export type AccordionPanelProps = CustomProps<
AccordionPrimitive.AccordionContentProps
>;
/**
 * This is the content area that will expand when the accordion is opened.
 * This must be used within an <AccordionItem /> instance.
 * @alias AccordionPanelProps
 * */
export const AccordionPanel = React.forwardRef<
HTMLDivElement,
AccordionPanelProps
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        css={{
            overflow: 'hidden',
            width: '100%',
            '&[data-state="open"]': {
                animation: `${slideDown} 400ms forwards`,
            },
            '&[data-state="closed"]': {
                animation: `${slideUp} 400ms forwards`,
            },
            '@media (prefers-reduced-motion: reduce)': {
                animation: 'none!important',
            },
        }}
    >
        <div
            css={{
                width: '100%',
            }}
            className={className}
            {...props}
        />
    </AccordionPrimitive.Content>
));

AccordionPanel.displayName = 'AccordionPanel';

/**
 * This is an open/close caret icon that will rotate when the accordion
 * is opened or closed.
 * This must be used within an <AccordionItem /> instance.
 * @alias AccordionIconProps
 * */
export const AccordionIcon = ({
    className,
    disableRotate,
    arrow = false,
    ...props
}: { disableRotate?: boolean, arrow?: boolean } & React.HTMLProps<
SVGSVGElement
>): JSX.Element => {
    const Icon = arrow ? ArrowRightIcon : ChevronDownIcon;
    return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
        <Icon
            className={className}
            css={{
                transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none!important',
                },
                '[data-state=open] &': {
                    transform: disableRotate ? '' : 'rotate(180deg)',
                },
            }}
            {...props}
        />
    );
};

AccordionIcon.displayName = 'AccordionIcon';

export default Accordion;

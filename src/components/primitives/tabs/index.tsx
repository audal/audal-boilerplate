import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { keyframes } from '@emotion/react';
import { useDraggable } from '../../../utils/use-draggable-scroll';

export interface TabsProps
    extends Omit<
    HtmlPropsNoRef<HTMLDivElement>,
    'value' | 'defaultValue' | 'dir' | 'as'
    > {
    index?: number
    defaultIndex?: number
}

export const Tabs = ({
    className,
    index,
    defaultIndex = 0,
    ...props
}: TabsProps): JSX.Element => (
    <TabsPrimitive.Root
        css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}
        className={className}
        value={index ? `tabs-${index}` : undefined}
        defaultValue={`tabs-${defaultIndex || (index || 0)}`}
        {...props}
    />
);

export type TabListProps = Omit<
HtmlPropsNoRef<HTMLDivElement>,
'value' | 'defaultValue' | 'dir' | 'as'
>;

export const TabList = ({ className, children, ...props }: TabListProps): JSX.Element => {
    const containerRef = React.useRef(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { events } = useDraggable(containerRef, {
        applyRubberBandEffect: true,
    });

    return (
        <TabsPrimitive.TabsList
            ref={containerRef}
            {...events}
            css={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'flex-start',
                width: '100%',
                '@media (max-width: 991px)': {
                    height: 'auto',
                },
                MsOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '::-webkit-scrollbar': { display: 'none' },
            }}
            className={className}
            {...props}
        >
            {React.Children.map(children, (child, index) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as any, { value: `tabs-${index}` });
                }
                return null;
            })}
        </TabsPrimitive.TabsList>
    );
};

export interface TabPanelsProps {
    children: React.ReactNode[] | React.ReactNode
}

export const TabPanels = ({ children }: TabPanelsProps): JSX.Element => (
    <>
        {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child as any, { value: `tabs-${index}` });
            }
            return null;
        })}
    </>
);

export interface TabProps
    extends Omit<
    HtmlPropsNoRef<HTMLButtonElement>,
    'value' | 'defaultValue' | 'dir' | 'as' | 'type'
    > {
    value: string
}

export const Tab = ({ className, value, ...props }: TabProps): JSX.Element => (
    <TabsPrimitive.Trigger
        value={value as string}
        className="keen-slider__slide"
        css={{
            display: 'flex',
            alignItems: 'flex-start',
            flexShrink: '0',
            paddingTop: '13px',
            marginRight: '50px',
            width: 'auto !important',
            paddingBottom: '13px',
            '&:last-of-type': {
                marginRight: '0px',
            },
            '@media (max-width: 767px)': {
                marginRight: '50px',
            },
            '@media (max-width: 479px)': {
                paddingTop: '10px',
                marginRight: '22px',
                paddingBottom: '10px',
            },
            '&[data-state="active"] span': {
                '&:before': {
                    transform: 'scale(1)',
                    transformOrigin: 'bottom left',
                },
            },
        }}
    >
        <span
            css={{
                color: '#040503',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '15px',
                textTransform: 'uppercase',
                position: 'relative',
                cursor: 'pointer',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    transform: 'scale(0)',
                    height: '2px',
                    bottom: '0',
                    right: '0',
                    top: '20px',
                    backgroundColor: '#9db8d1',
                    transformOrigin: 'bottom right ',
                    transition: 'transform 0.3s ease-out',
                },
                '&:hover:before': {
                    transform: 'scale(1)',
                    transformOrigin: 'bottom left',
                },
                '@media (max-width: 767px)': {
                    fontSize: '13px',
                    lineHeight: '18px',
                },
                '@media (max-width: 479px)': {
                    fontSize: '10px',
                    lineHeight: '14px',
                },
            }}
            className={className}
            {...props}
        />
    </TabsPrimitive.Trigger>
);
export interface TabPanelProps
    extends Omit<
    HtmlPropsNoRef<HTMLDivElement>,
    'value' | 'defaultValue' | 'dir' | 'as'
    > {
    value: string
}

const fadeIn = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
});

export const TabPanel = ({ value, className, ...props }: TabPanelProps): JSX.Element => (
    <TabsPrimitive.Content
        value={value}
        css={{
            flexGrow: 1,
            padding: 0,
            outline: 'none',
            animation: `${fadeIn} 300ms ease`,
        }}
        className={className}
        {...props}
    />
);

export default Tabs;

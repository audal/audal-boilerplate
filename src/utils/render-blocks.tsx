import React from 'react';
import { useInView } from 'react-intersection-observer';
import useScrollPosition from '@react-hook/window-scroll';

interface RenderBlocksProps {
    blocks: any[];
    postType: string;
}

const RenderBlocks = ({
    blocks,
    postType,
}: RenderBlocksProps): JSX.Element | JSX.Element[] | null => {
    if (!blocks || !Array.isArray(blocks) || !postType) {
        return null;
    }

    blocks = blocks.map(
        (
            { fieldGroupName, ...el }: { fieldGroupName: string; el: any },
            i: number,
        ) => {
            if (!fieldGroupName) return null;

            fieldGroupName = fieldGroupName.replace(postType, '');

            const block = {
                // _Acf_ContentBlocks_AnimatedHero: AnimatedHero,
            }[fieldGroupName];

            if (!block) return null;

            if (fieldGroupName !== '_Acf_ContentBlocks_AnimatedHero' && i > 2) {
                // @ts-ignore
                return (
                    <ScrollFadeIn>
                        {React.createElement(block, { ...el, key: i })}
                    </ScrollFadeIn>
                );
            }

            // @ts-ignore
            return React.createElement(block, { ...el, key: i });
        },
    );

    return blocks;
};

export default RenderBlocks;

export const ScrollFadeIn = ({ initialInView = false, ...props }) => {
    const [isSsr, setIsSsr] = React.useState(true);

    const { ref, inView } = useInView({
        rootMargin: '128px',
        threshold: 0.2,
        initialInView: isSsr ? true : initialInView,
    });

    React.useEffect(() => {
        setIsSsr(false);
    }, []);

    const previousScrollPosition = React.useRef<number>(0);
    const scrollY = useScrollPosition(5);
    const scrollDirection =		previousScrollPosition.current > scrollY ? 'up' : 'down';
    previousScrollPosition.current = scrollY;

    return (
        <div css={{ width: '100%', overflow: 'hidden' }}>
            <div
                ref={ref}
                css={{
                    width: '100%',
                    overflow: 'hidden',
                    transition: 'opacity 0.7s, transform 0.4s',
                }}
                style={{
                    transform: inView
                        ? 'translateY(0px)'
                        : scrollDirection === 'down'
                            ? 'translateX(20px)'
                            : 'translateX(-50px)',
                    opacity: inView ? 1 : 0,
                }}
                {...props}
            />
        </div>
    );
};

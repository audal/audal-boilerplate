import React from 'react';

interface RenderBlocksProps {
    blocks: never[];
    postType: string;
}

const RenderBlocks = ({
    blocks,
    postType,
}: RenderBlocksProps): (null | JSX.Element)[] => {
    if (!blocks || !Array.isArray(blocks) || !postType) {
        return [null];
    }

    return blocks.map(
        (
            { fieldGroupName, ...el }: { fieldGroupName: string; el: never },
        ) => {
            if (!fieldGroupName) return null;

            const parsedName = fieldGroupName.replace(postType, '');

            const block = {
                // _Acf_ContentBlocks_AnimatedHero: AnimatedHero,
            }[parsedName];

            if (!block) return null;

            return React.createElement(block, { ...el, key: fieldGroupName });
        },
    );
};

export default RenderBlocks;

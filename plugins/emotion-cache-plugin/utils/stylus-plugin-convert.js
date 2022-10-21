const DECLARATION = 'decl';

const pxRegexp = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)px/g;

module.exports = ({ allowList, blockList } = {}) => (element) => {
    const pxSize = 16;

    if (element.type === DECLARATION) {
        const declarationHasPx = element.value.match(pxRegexp);

        if (declarationHasPx) {
            if (allowList && !allowList.includes(element.props)) return;
            if (blockList && blockList.includes(element.props)) return;

            const expression = (element.children).replace(
                pxRegexp,
                (match, group) => (group ? `${(Number(group)) / pxSize}rem` : match),
            );
            // eslint-disable-next-line no-param-reassign
            element.return = `${element.props}:${expression};`;
        }
    }
};

const {
    DECLARATION,
} = require('stylis');

const pxRegexp = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)rem/g;

module.exports = ({ allowList, blockList} = {}) => (element) => {
    const remSize = 16
    const pxSize = 16
    if (element.type === DECLARATION) {
        const declarationHasPx = element.value.match(pxRegexp);

        if (declarationHasPx) {
            if (allowList && !allowList.includes(element.props )) return;
            if (blockList && blockList.includes(element.props )) return;

            const expression = (element.children ).replace(
                pxRegexp,
                (match, group) => (group ? (Number(group) * remSize) / pxSize + 'rem' : match),
            );
            const reconstructedDeclaration = element.props + ':' + expression + ';';

            element.return = reconstructedDeclaration;
        }
    }
};

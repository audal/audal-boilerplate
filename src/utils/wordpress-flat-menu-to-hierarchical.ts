/*
* Turn flat WP menus into nested structures
* Query must look like:
* {
      wpMenu(locations: {eq: PRIMARY}) {
        menuItems {
          nodes {
            parentId // needed to resolve to relationship
            id // needed to resolve to relationship
          }
        }
      }
    }
*  */

interface WordpressMenuItem {
    id: string;
    parentId?: string;
    label: string;
    url: string;
}

interface ParsedMenuItem {
    label: string;
    url: string;
    childMenu: ParsedMenuItem[];
    id: string;
    parentId?: string;
}

const wordpressFlatMenuToHierarchical = (
    data: WordpressMenuItem[] = [],
): ParsedMenuItem[] => {
    const tree: ParsedMenuItem[] = [];
    const children: { [key: string]: ParsedMenuItem[] } = {};
    data.forEach((item) => {
        const { id, parentId } = item;
        const realParent = parentId;
        children[id] = children[id] || [];
        const newItem: ParsedMenuItem = {
            ...item,
            childMenu: children[id] ? children[id] : [],
        };
        if (realParent) {
            if (!children[realParent]) {
                children[realParent] = [];
            }
            children[realParent].push(newItem);
        } else {
            tree.push(newItem);
        }
    });
    return tree;
};

export default wordpressFlatMenuToHierarchical;

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
	id: number;
	parentId?: number;
	label: string;
	url: string;
}

interface ParsedMenuItem {
	label: string;
	url: string;
	childMenu: ParsedMenuItem[];
	id: number;
	parentId: number;
}

export const wordpressFlatMenuToHierarchical = (
	data: WordpressMenuItem[] = []
): ParsedMenuItem[] => {
	const tree = [];
	const children = {};
	data.forEach((item) => {
		const newItem = { ...item } as ParsedMenuItem;
		const { id: id, parentId: parentId = 0 } = newItem;
		children[id] = children[id] || [];
		newItem.childMenu = children[id];
		parentId
			? (children[parentId] = children[parentId] || []).push(newItem)
			: tree.push(newItem);
	});
	return tree;
};

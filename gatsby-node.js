const fse = require("fs-extra");

// Use this if site is an single-page scroller, in conjunction with dynamic anchors component

/*exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions
    if (page.path === `/`) {
        page.matchPath = `/*`
        createPage(page)
    }
}*/

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions;
  createFieldExtension({
    name: "svgData",
    extend(options, prevFieldConfig) {
      return {
        async resolve(source) {
          if (source.extension === "svg") {
            let svg = await fse.readFile(source.absolutePath, "utf8");
            return svg;
          }
          return null;
        },
      };
    },
  });
  createTypes(`
    type File implements Node {
      svgData: String @svgData
    }
  `);
};

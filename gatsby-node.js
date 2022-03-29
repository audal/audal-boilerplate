const fse = require("fs-extra");
const { CompiledExtractPlugin } = require('@compiled/webpack-loader');

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

/*exports.onCreateWebpackConfig = ({actions}) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader' },
                        {
                            loader: '@compiled/webpack-loader',
                            options: {
                                extract: true,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CompiledExtractPlugin(),
        ],
    })
}*/

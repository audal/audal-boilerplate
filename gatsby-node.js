/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require("fs-extra");
const { CompiledExtractPlugin } = require('@compiled/webpack-loader');

// can now use process.env.WP_URL, etc...
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

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

/*exports.onCreateWebpackConfig = ({actions, plugins, stage, getConfig}) => {

	const config = getConfig();

	console.log(config.module.rules)

	config.module.rules.push({
		test: /\.(js|ts|tsx)$/,
		exclude: /node_modules/,
		use:  [
			{
				loader: '@compiled/webpack-loader',
				options: {
					extract: false,
				},
			},
		],
	});

	//config.plugins.push(new CompiledExtractPlugin({}))

	actions.replaceWebpackConfig(config);
}
*/

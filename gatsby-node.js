/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require("fs-extra");

// can now use process.env.WP_URL, etc...
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

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

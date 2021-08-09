const url = require("url");
const path = require("path");
const axios = require("axios");
const fse = require("fs-extra");
const { extractUrls } = require("./parse-sitemap");

const withoutTrailingSlash = (path) =>
  path === `/` ? path : path.replace(/\/$/, ``);
const publicPath = `./public`;
const baseUrl = process.env.WP_URL;
let gatsbyUrl = process.env.URL ? process.env.URL : "http://localhost:8888";
gatsbyUrl = gatsbyUrl.replace("https://", "");
gatsbyUrl = gatsbyUrl.replace("http://", "");

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (find, replace) {
    return this.split(find).join(replace);
  };
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  let siteMapIndex = await axios.get(
    `https://${withoutTrailingSlash(baseUrl)}/sitemap_index.xml`,
    {
      auth: {
        username: "shesacrowd2",
        password: "password",
      },
    }
  );
  const downloadableXMLNodes = await extractUrls(siteMapIndex.data);
  siteMapIndex = siteMapIndex.data.replaceAll(baseUrl, gatsbyUrl);
  siteMapIndex = siteMapIndex.replaceAll(
    `http://${gatsbyUrl}`,
    `https://${gatsbyUrl}`
  );
  console.log(siteMapIndex);
  await fse.outputFile(
    path.join(publicPath, `sitemap_index.xml`),
    siteMapIndex
  );

  for (const node of downloadableXMLNodes) {
    let mapFromNode = await axios.get(node, {
      auth: {
        username: "shesacrowd2",
        password: "password",
      },
    });
    mapFromNode = mapFromNode.data.replaceAll(baseUrl, gatsbyUrl);
    mapFromNode = mapFromNode.replaceAll(
      `https://${gatsbyUrl}`,
      `https://${gatsbyUrl}`
    );
    const url_parts = url.parse(node);
    await fse.outputFile(
      path.join(publicPath, url_parts.pathname),
      mapFromNode
    );
  }

  createRedirect({
    fromPath: `/sitemap.xml`,
    toPath: `/sitemap_index.xml`,
    isPermanent: false,
    redirectInBrowser: true,
    force: true,
  });
};

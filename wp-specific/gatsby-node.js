// Add all of this into your existing gatsby-node for Wordpress builds

const path = require("path");
const fse = require(`fs-extra`);
const { paginate } = require("gatsby-awesome-pagination");

const nodeTypes = {
  contentNode: "content-node",
  termNode: "term-node",
  authorNode: "author-node",
};

String.prototype.toTitleCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

async function findTemplate({
  isContentNode,
  isSingle,
  type,
  dbId,
  isAuthor,
  slug,
}) {
  let general = `./src/wp-templates/${
    isContentNode ? nodeTypes.contentNode : nodeTypes.termNode
  }/${isSingle ? "single" : "archive"}/base.js`;
  let group = `./src/wp-templates/${
    isContentNode ? nodeTypes.contentNode : nodeTypes.termNode
  }/${isSingle ? "single" : "archive"}/${type}.js`;
  let specific = `./src/wp-templates/${
    isContentNode ? nodeTypes.contentNode : nodeTypes.termNode
  }/${isSingle ? "single" : "archive"}/${
    `${type} ${dbId}` ? dbId : "--------"
  }.js`;

  if (slug === null) {
    const defaultArchive = `./src/wp-templates/${
      isContentNode ? nodeTypes.contentNode : nodeTypes.termNode
    }/${isSingle ? "single" : "archive"}/default-archive.js`;
    const defaultArchiveExists = await fse.pathExists(defaultArchive);
    if (defaultArchiveExists) {
      return defaultArchive;
    }
  }

  if (isAuthor) {
    general = `./src/wp-templates/${nodeTypes.authorNode}/base.js`;
    group = `./src/wp-templates/${nodeTypes.authorNode}/${dbId}.js`;
    specific = `./src/wp-templates/${nodeTypes.authorNode}/${dbId}.js`;
  }

  const specificExists = await fse.pathExists(specific);
  const groupExists = await fse.pathExists(group);
  const generalExists = await fse.pathExists(general);

  if (isSingle && specificExists) {
    return specific;
  }
  if (groupExists) {
    return group;
  }
  if (generalExists) {
    return general;
  }
  console.log(specificExists, groupExists, generalExists);
  return false;
}

function wordpressLink(link) {
  return link.endsWith("/") && link.length > 1
    ? link.substring(0, link.length - 1)
    : link;
}

async function templator(
  { webLink, slug, isContentNode, type, id, dbId },
  createPage,
  nodesForPagination = false,
  postsPerPage = 10,
  isAuthor = false
) {
  const templatePath = await findTemplate({
    isContentNode,
    isSingle: !nodesForPagination,
    type,
    dbId,
    isAuthor,
    slug,
  });

  if (templatePath) {
    if (!nodesForPagination) {
      console.log(webLink, slug, id, isContentNode, type, dbId);

      createPage({
        path: wordpressLink(webLink),
        component: path.resolve(templatePath),
        context: {
          slug,
          dbId,
          id,
        },
      });
    } else {
      paginate({
        context: {
          slug,
          dbId,
          type: type.toTitleCase(),
        },
        createPage,
        items: nodesForPagination,
        itemsPerPage: postsPerPage,
        pathPrefix: wordpressLink(webLink),
        component: path.resolve(templatePath),
      });
    }
  } else {
    console.log(`No template found for ${type}`);
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  const allSettingsQuery = await graphql(`
    query {
      wp {
        allSettings {
          readingSettingsPostsPerPage
        }
      }
    }
  `);

  const postsPerPage =
    allSettingsQuery.data.wp.allSettings.readingSettingsPostsPerPage;

  const contentTypesQuery = await graphql(`
    query {
      allWpContentType {
        nodes {
          showInGraphql
          hasArchive
          archivePath
          excludeFromSearch
          graphqlPluralName
          graphqlSingleName
          public
          name
        }
      }
    }
  `);

  const blogPostQuery = await graphql(`
    query {
      allWpPost {
        nodes {
          link
          slug
          id
          databaseId
        }
      }
    }
  `);

  for (const contentType of contentTypesQuery.data.allWpContentType.nodes) {
    // remove non-public types
    // if (!contentType.public) { continue; }

    // create invididual content pieces
    let contentTypeQuery;

    if (contentType.graphqlSingleName === "page") {
      contentTypeQuery = await graphql(`
      query {
        allWp${contentType.graphqlSingleName.toTitleCase()} {
          nodes {
            link
            slug
            id
            databaseId
            isFrontPage
            isPostsPage
          }
        }
      }
    `);
    } else {
      contentTypeQuery = await graphql(`
      query {
        allWp${contentType.graphqlSingleName.toTitleCase()} {
          nodes {
            link
            slug
            id
            databaseId
          }
        }
      }
    `);
    }

    if (contentType.graphqlSingleName !== "mediaItem") {
      for (const node of contentTypeQuery.data[
        `allWp${contentType.graphqlSingleName.toTitleCase()}`
      ].nodes) {
        if (node.isFrontPage) {
          console.log("isfrontpage", node);
        }

        if (node.isPostsPage) {
          await templator(
            {
              webLink: node.link,
              slug: node.slug,
              id: node.id,
              isContentNode: true,
              isSingle: false,
              type: contentType.graphqlSingleName.toLowerCase(),
              dbId: node.databaseId,
            },
            createPage,
            blogPostQuery.data.allWpPost.nodes,
            postsPerPage
          );
        } else {
          await templator(
            {
              webLink: node.link,
              slug: node.slug,
              id: node.id,
              isContentNode: true,
              isSingle: true,
              type: contentType.graphqlSingleName.toLowerCase(),
              dbId: node.databaseId,
            },
            createPage,
            false,
            postsPerPage
          );
        }
      }

      // if no archive, exit
      if (contentType.archivePath) {
        // if(contentType.isFrontPage && contentType.isPostsPage) {

        console.log("has archive");
        console.log(contentType);

        await templator(
          {
            webLink: contentType.archivePath,
            slug: null,
            id: null,
            isContentNode: true,
            isSingle: false,
            type: contentType.graphqlSingleName.toLowerCase(),
            dbId: null,
          },
          createPage,
          blogPostQuery.data.allWpPost.nodes,
          postsPerPage
        );
      }

      if (!contentType.excludeFromSearch) {
        continue;
      }
    }
    // if not excluded from search, add to search options
  }

  // find taxonomies
  const taxonomiesQuery = await graphql(`
    query {
      allWpTaxonomy {
        nodes {
          graphqlSingleName
          hierarchical
          id
        }
      }
    }
  `);

  for (const taxonomyType of taxonomiesQuery.data.allWpTaxonomy.nodes) {
    // remove non-public/restricted taxonomies
    // if (!taxonomyType.public) { continue; }

    // remove postFormat taxonomy
    if (taxonomyType.graphqlSingleName === "postFormat") {
      continue;
    }

    // create terms
    const termQuery = await graphql(`
        query {
           allWp${taxonomyType.graphqlSingleName.toTitleCase()} {
            nodes {
              databaseId
              uri
              slug
              name
              contentNodes {
                nodes {
                  id
                }
              }
            }
          }
        }
      `);

    for (const term of termQuery.data[
      `allWp${taxonomyType.graphqlSingleName.toTitleCase()}`
    ].nodes) {
      await templator(
        {
          webLink: term.uri,
          slug: term.slug,
          isContentNode: false,
          isSingle: false,
          type: taxonomyType.graphqlSingleName.toLowerCase(),
          dbId: term.databaseId,
        },
        createPage,
        term.contentNodes.nodes,
        postsPerPage
      );
    }
  }

  // create authors
  const authorsQuery = await graphql(`
    query {
      allWpUser {
        nodes {
          databaseId
          uri
          slug
          id
          posts {
            nodes {
              id
            }
          }
        }
      }
    }
  `);

  for (const node of authorsQuery.data.allWpUser.nodes) {
    await templator(
      {
        webLink: node.uri,
        id: node.id,
        slug: node.slug,
        isContentNode: false,
        isSingle: false,
        type: "author",
        dbId: node.databaseId,
      },
      createPage,
      node.posts.nodes,
      postsPerPage,
      true
    );
  }

  const yoastRedirects = await graphql(`
    {
      wp {
        seo {
          redirects {
            format
            origin
            target
            type
          }
        }
      }
    }
  `);

  yoastRedirects.data.wp.seo.redirects.forEach((item) => {
    createRedirect({
      fromPath: `/${item.origin}`,
      toPath: `/${item.target}`,
      isPermanent: true,
      force: true,
      redirectInBrowser: true,
    });
  });
};

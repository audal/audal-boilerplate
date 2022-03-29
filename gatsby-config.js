module.exports = {
  siteMetadata: {
    title: `Audal Boilerplate - make sure this is updated`,
    description: `Default Audal Labs starting project`,
    author: `Audal Labs`,
    keywords: `audal, labs, digital, experiences`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-layout",
    "gatsby-plugin-react-svg",
    `gatsby-plugin-audal`,
    /*     `gatsby-plugin-pressless`,
        {
          resolve: `gatsby-plugin-yoast-sitemap`,
          options: {
            baseUrl: process.env.WP_URL,
            gatsbyUrl: "enter your gatsby url here"
          }
        },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        develop: {
          hardCacheMediaFiles: true
        },
        url: `https://${process.env.WP_URL}/graphql`,
        debug: {
          preview: true,
          graphql: {
            printIntrospectionDiff: true,
            showQueryVarsOnError: true,
            writeQueriesToDisk: false
          }
        },
        schema: { timeout: 800000, perPage: 20, requestConcurrency: 5, previewRequestConcurrency: 2 },
        presets: [
          {
            useIf: () => process.env.NODE_ENV === `development`,
            options: {
              type: {
                Post: {
                  limit: 60
                },
                Page: {
                  limit: 10
                }
              }
            }
          }
        ]
      }
    },*/
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeLinkHeaders: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Inter\:400,400i,500,600,700`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

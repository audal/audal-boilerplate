module.exports = {
  plugins: [
    /*"gatsby-plugin-sass",*/
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-typescript`,
    "gatsby-plugin-layout",
    "gatsby-plugin-react-svg",
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        isResettingCSS: true,
        isUsingColorMode: false,
      },
    },
    {
      resolve: `@el7cosmos/gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Inter`,
            variants: [`400`, `400i`, `700`]
          }
        ]
      }
    },
    /*{
      resolve: "gatsby-plugin-sentry",
      options: {
        dsn: "sentry dsn goes here",
        environment: process.env.NODE_ENV,
        enabled: (() => ["production", "stage"].indexOf(process.env.NODE_ENV) !== -1)()
      }
    }*/
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

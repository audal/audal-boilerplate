import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Seo } from "gatsby-plugin-wpgraphql-seo";
import * as htmlEntities from "html-entities";
import { graphql, Link } from "gatsby";

/*

      This component is used as a template for the main blog page in WordPress. It is necessary to create this as a template,
      as the page is created dynamically in gatsby-node based on WordPress settings.

*/

export default function BlogTemplate({ data, pageContext }) {
  return (
    <>
      <Seo
        title={htmlEntities.decode(data.wp.seo.schema.siteName)}
        postSchema={JSON.parse(data.wp.seo.contentTypes.post.schema.raw)}
      />
      <Chakra.Box>{JSON.stringify(data)}</Chakra.Box>
    </>
  );
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    wp {
      seo {
        schema {
          siteName
        }
        contentTypes {
          post {
            schema {
              raw
            }
          }
        }
      }
    }
    allWpPost(skip: $skip, limit: $limit) {
      nodes {
        title
        author {
          node {
            id
            uri
            name
            firstName
            avatar {
              url
            }
            description
          }
        }
        link
        uri
        categories {
          nodes {
            link
            name
          }
        }
        tags {
          nodes {
            link
            name
          }
        }
        date(formatString: "LL")
        excerpt
        featuredImage {
          node {
            altText
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        seo {
          breadcrumbs {
            text
            url
          }
          canonical
          cornerstone
          focuskw
          metaDesc
          metaKeywords
          twitterDescription
          title
        }
      }
    }
  }
`;

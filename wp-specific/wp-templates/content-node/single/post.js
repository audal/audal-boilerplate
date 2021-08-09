import React from "react";
import * as Chakra from "@chakra-ui/react";
import { graphql, Link } from "gatsby";
import "../../../wp.scss";

export default function Post({ data, pageContext }) {
  const post = data.allWpPost.nodes[0];

  return <Chakra.Box w="100%">{JSON.stringify(post)}</Chakra.Box>;
}

export const query = graphql`
  query($id: String!) {
    allWpPost(filter: { id: { eq: $id } }) {
      nodes {
        template {
          templateName
        }
        contentType {
          node {
            graphqlSingleName
          }
        }
        date(formatString: "LL")
        title
        content
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
        author {
          node {
            id
            uri
            name
            description
            avatar {
              url
            }
            seo {
              metaDesc
              metaRobotsNofollow
              metaRobotsNoindex
              title
              social {
                youTube
                wikipedia
                twitter
                soundCloud
                pinterest
                mySpace
                linkedIn
                instagram
                facebook
              }
            }
          }
        }
        seo {
          breadcrumbs {
            text
            url
          }
          title
          metaDesc
          focuskw
          metaKeywords
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphTitle
          opengraphDescription
          opengraphImage {
            altText
            sourceUrl
            srcSet
          }
          twitterTitle
          twitterDescription
          twitterImage {
            altText
            sourceUrl
            srcSet
          }
          canonical
          cornerstone
          schema {
            articleType
            pageType
            raw
          }
        }
      }
    }
  }
`;

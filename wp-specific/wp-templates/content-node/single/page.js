import React from "react";
import { graphql } from "gatsby";
import { Seo } from "gatsby-plugin-wpgraphql-seo";
import * as htmlEntities from "html-entities";
import * as Chakra from "@chakra-ui/react";

export default function Page({ data, pageContext }) {
  let post = data.allWpPage.nodes[0];

  return (
    <>
      <Seo post={post} title={htmlEntities.decode(post.seo.title)} />
      <Chakra.Flex flexDirection="column" width="100%">
        {/*post.acf.contentBlocks && post.acf.contentBlocks.map((el, i) => RenderBlock(el.fieldGroupName, el, i, 'page'))*/}
      </Chakra.Flex>
    </>
  );
}

export const query = graphql`
  query($id: String!) {
    allWpPage(filter: { id: { eq: $id } }) {
      nodes {
        template {
          templateName
        }
        contentType {
          node {
            graphqlSingleName
          }
        }
        date
        title
        acf {
          contentBlocks {
            ... on WpPage_Acf_ContentBlocks_TwoColumn {
              fieldGroupName
              leftSource
              leftText
              rightHeader
              rightText
              sectionBackgroundColor
              buttonText
              buttonLink
              leftColumnSize
            }
            ... on WpPage_Acf_ContentBlocks_FullWidthIllustration {
              fieldGroupName
            }
            ... on WpPage_Acf_ContentBlocks_Map {
              fieldGroupName
            }
            ... on WpPage_Acf_ContentBlocks_Statistics {
              fieldGroupName
              heading
              sectionBackgroundColor
              statistic {
                fieldGroupName
                statisticBody
                statisticHeading
              }
            }
            ... on WpPage_Acf_ContentBlocks_Slider {
              fieldGroupName
              heading
              sliderItems {
                body
                buttonLink
                buttonText
                fieldGroupName
                heading
                image {
                  localFile {
                    publicURL
                    svgData
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
            ... on WpPage_Acf_ContentBlocks_LogoSet {
              fieldGroupName
              heading
              logos {
                image {
                  localFile {
                    publicURL
                  }
                }
                fieldGroupName
              }
            }
            ... on WpPage_Acf_ContentBlocks_AccordionSection {
              fieldGroupName
              heading
              sectionBackgroundColor
              accordionItems {
                ... on WpPage_Acf_ContentBlocks_AccordionSection_AccordionItems_StandardAccordion {
                  fieldGroupName
                  singleAccordionHeading
                  singleAccordionLeftText
                  singleAccordionRightText
                }
                ... on WpPage_Acf_ContentBlocks_AccordionSection_AccordionItems_LinksAccordion {
                  fieldGroupName
                  singleAccordionHeading
                  linksAccordionSubItem {
                    bottomText
                    buttonLink
                    buttonText
                    fieldGroupName
                  }
                }
                ... on WpPage_Acf_ContentBlocks_AccordionSection_AccordionItems_TwoEqualColumnsAccordion {
                  fieldGroupName
                  singleAccordionHeading
                  singleAccordionLeftText
                  singleAccordionRightText
                  singleAccordionTopText
                }
              }
            }
            ... on WpPage_Acf_ContentBlocks_IllustratedCallToAction {
              body
              fieldGroupName
              heading
              variant
              button1Text
              button1Link
              button2Text
              button2Link
              smallImage {
                localFile {
                  publicURL
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              largeImage {
                localFile {
                  publicURL
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            ... on WpPage_Acf_ContentBlocks_TwoColumnImageAndText {
              body
              fieldGroupName
              heading
              imageSource
              sectionBackgroundColor
              image {
                localFile {
                  publicURL
                  svgData
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            ... on WpPage_Acf_ContentBlocks_ActionIcons {
              body
              fieldGroupName
              heading
              sectionBackgroundColor
              actionIconSet {
                icon {
                  localFile {
                    publicURL
                  }
                }
                heading
                text
              }
            }
            ... on WpPage_Acf_ContentBlocks_RolloverLogoCta {
              fieldGroupName
            }
            ... on WpPage_Acf_ContentBlocks_LetterSection {
              fieldGroupName
              heading
              textBesideImage
              textUnderImage
            }
            ... on WpPage_Acf_ContentBlocks_VideoSection {
              body
              buttonLink
              buttonText
              fieldGroupName
              heading
              video
            }
            ... on WpPage_Acf_ContentBlocks_PrivacyPolicyHeading {
              fieldGroupName
              heading
              bodyText
            }
            ... on WpPage_Acf_ContentBlocks_PrivacyPolicySection {
              fieldGroupName
              heading
              bodyText
            }
            ... on WpPage_Acf_ContentBlocks_AboutSection {
              bodyTextBottom
              bodyTextTop
              heading
              fieldGroupName
              imageSource
              quote
              quoteCitation
              image {
                localFile {
                  svgData
                  publicURL
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            ... on WpPage_Acf_ContentBlocks_Team {
              fieldGroupName
              heading
              teamMembers {
                name
                role
                image {
                  localFile {
                    svgData
                    publicURL
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
            ... on WpPage_Acf_ContentBlocks_Hero {
              biLine
              button1Link
              button1Text
              button2Link
              button2Text
              fieldGroupName
              heading
              largeImage2Optional {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                  svgData
                  publicURL
                }
              }
              largeImage1 {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                  svgData
                  publicURL
                }
              }
              sectionBackgroundGradientColor1
              sectionBackgroundGradientColor2
              smallImage {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                  svgData
                  publicURL
                }
              }
            }
          }
        }
        featuredImage {
          node {
            altText
            localFile {
              publicURL
              svgData
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

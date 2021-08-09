import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface Props {
  title: string;
  description?: string;
  shareImage?: string;
  location?: ReachHelperProps;
}

interface ReachHelperProps {
  href: string;
}

export const Seo = ({
  description,
  title,
  shareImage,
  location,
}: Props): React.ReactElement => {
  let prettyHref = "";

  if (location?.href) {
    prettyHref = location.href
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
      .split(".")[0];
  }

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata?.description;
  const defaultTitle = site.siteMetadata?.title;
  const keywords = site.siteMetadata?.keywords;

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-US",
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: shareImage,
        },
        {
          property: `og:url`,
          content: prettyHref,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          property: `summary_large_image`,
        },
        {
          name: `twitter:url`,
          property: prettyHref,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          name: `twitter:image`,
          content: shareImage,
        },
      ]}
    />
  );
};

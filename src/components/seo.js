import React from 'react';
import {Helmet} from "react-helmet";
import {graphql, useStaticQuery} from "gatsby";

export function Seo({ description, lang, meta, title, image}) {

    /*const { site } = useStaticQuery(
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
    )

    const keywords = site.siteMetadata.keywords
    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata?.title

    return (
        <Helmet
            htmlAttributes={{
                lang,
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
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:image`,
                    content: image,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:image`,
                    content: image,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata?.author || ``,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta)}
        />
    );*/
}

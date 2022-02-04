import React from "react"
import { StaticQuery, graphql, withPrefix } from "gatsby"
import { Helmet } from "react-helmet"

function Meta({ page, title, description, slug }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              siteUrl
              description
              twitter
            }
          }
        }
      `}
      render={data => {
        const siteMeta = data.site.siteMetadata
        
        let metaTitle, metaDescription, metaUrl, metaType
        const metaTwitter = siteMeta.twitter
        const metaImage = siteMeta.siteUrl + withPrefix('/img/rnote-logo-board-inversed.png')

        if (page === "home"){
          metaTitle = siteMeta.title
          metaDescription = siteMeta.description
          metaUrl = siteMeta.siteUrl
          metaType = "website"
        } else {
          metaTitle = title + " | " + siteMeta.title
          metaDescription = description
          metaUrl = siteMeta.siteUrl + "/" + slug + "/"
          metaType = "article"
        }
        return(
          <Helmet
            htmlAttributes={{ lang: 'ja' }}
            title={metaTitle}
            link={[
              { rel: 'shortcut icon', href: 'https://parashuto.com/rriver/wp/wp-content/themes/rriver2/favicon.ico'},
            ]}
            meta={[
              { name: 'author', content: `ryo watanabe` },
              { name: 'title', content: metaTitle },
              { name: 'description', content: metaDescription },
              { property: 'og:title', content: metaTitle },
              { property: 'og:url', content: metaUrl },
              { property: 'og:description', content: metaDescription },
              { property: 'og:type', content: metaType },
              { property: 'og:image', content: metaImage },
              { property: 'twitter:card', content: 'summary' },
              { property: 'twitter:site', content: metaTwitter },
              { property: 'twitter:creator', content: metaTwitter },
            ]}
          />
        )
      }}
    />
  )
}

export default Meta
import React from "react"
import { graphql, withPrefix } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.css"
import Helmet from "react-helmet"
import "../styles/prism-tomorrow.css"

class postTemplate extends React.Component {
  render(){
    const post = this.props.data
    
    return (
      <Layout>
        <Helmet
          meta={[
            { name: 'author', content: `ryo watanabe` },
            { property: 'og:title', content: post.airtable.data.title },
            { property: 'og:url', content: `${post.site.siteMetadata.siteUrl}/${post.airtable.data.slug}/` },
            { property: 'og:description', content: post.airtable.data.body.childMarkdownRemark.excerpt },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: `${post.site.siteMetadata.siteUrl}${withPrefix('/img/rnote-logo-ogimage.png')}` },
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:site', content: post.site.siteMetadata.twitter },
            { property: 'twitter:creator', content: post.site.siteMetadata.twitter },
            { property: 'twitter:title', content: post.airtable.data.title },
            { property: 'twitter:description', content: post.airtable.data.body.childMarkdownRemark.excerpt },
            { property: 'twitter:image', content: `${post.site.siteMetadata.siteUrl}${withPrefix('/img/rnote-logo-ogimage.png')}` },
          ]}
        >
          <link rel="shortcut icon" href="https://parashuto.com/rriver/wp/wp-content/themes/rriver2/favicon.ico"></link>
          <title>{post.airtable.data.title} | R Note</title>
        </Helmet>
        <h1 className={styles.postTitle}>{post.airtable.data.title}</h1>
        <p className={styles.postDate}>Noted on {post.airtable.data.date}</p>
        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{
            __html: post.airtable.data.body.childMarkdownRemark.html
          }}
        />
      </Layout>
    )
  }
}

export default postTemplate

export const query = graphql`
  query($slug: String!){
    airtable(data: {slug: { eq: $slug }}) {
      data {
        title
        body {
          childMarkdownRemark {
            html
            excerpt
          }
        }
        date(formatString: "YYYY/MM/DD HH:mm")
        slug
      }
    }
    site {
      siteMetadata {
        siteUrl
        description
        twitter
      }
    }
  }
`
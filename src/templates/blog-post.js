import React from "react"
import { graphql, withPrefix } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.css"
import unified from "unified"
import markdown from "remark-parse"
import html from "remark-html"
import Helmet from "react-helmet"

class postTemplate extends React.Component {
  render(){
    const post = this.props.data
    
    return (
      <Layout>
        <Helmet
          meta={[
            { name: 'author', content: `ryo watanabe` },
            { property: 'og:title', content: post.airtable.data.title },
            { property: 'og:url', content: `${post.site.siteMetadata.url}/${post.airtable.data.slug}/` },
            { property: 'og:description', content: post.site.siteMetadata.description },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: withPrefix('/img/rnote-logo-ogimage.png') },
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
            __html: unified()
              .use(markdown)
              .use(html)
              .processSync(post.airtable.data.body)
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
          body
          date(formatString: "YYYY/MM/DD HH:mm")
          slug
        }
      }
      site {
        siteMetadata {
          url
          description
        }
      }
    }
`
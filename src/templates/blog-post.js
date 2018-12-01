import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.css"
import unified from "unified"
import markdown from "remark-parse"
import html from "remark-html"
import Helmet from "react-helmet"

export default ({ data }) => {
  const { airtable: post } = data
  return (
    <Layout>
      <Helmet
        title={`${post.data.title} | R Note`}
        meta={[
          { name: 'author', content: `ryo watanabe` },
          { property: 'og:title', content: post.data.title },
          { property: 'og:url', content: `https://rnote.work/${post.data.slug}`},
          { property: 'og:type', content: 'article' },
          { property: 'og:description', content: post.data.title },
        ]}
      >
        <link rel="shortcut icon" href="https://parashuto.com/rriver/wp/wp-content/themes/rriver2/favicon.ico"></link>
      </Helmet>
      <h1 className={styles.postTitle}>{post.data.title}</h1>
      <p className={styles.postDate}>Noted on {post.data.date}</p>
      <div
        className={styles.postBody}
        dangerouslySetInnerHTML={{
          __html: unified()
            .use(markdown)
            .use(html)
            .processSync(post.data.body)
        }}
      />
    </Layout>
  )
}

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
    }
`
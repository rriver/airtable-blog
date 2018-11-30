import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.css"
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';

export default ({ data }) => {
  const { airtable: post } = data
  return (
    <Layout>
      <h1 className={styles.postTitle}>{post.data.title}</h1>
      <p className={styles.postDate}>Posted on {post.data.date}</p>
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
        }
      }
    }
`
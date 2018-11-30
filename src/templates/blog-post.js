import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.css"

export default ({ data }) => {
  const { airtable: post } = data
  return (
    <Layout>
      <h1 className={styles.postTitle}>{post.data.title}</h1>
      <p className={styles.postDate}>Posted on {post.data.date}</p>
      <p className={styles.postBody}>{post.data.body}</p>
    </Layout>
  )
}

export const query = graphql`
    query($slug: String!){
      airtable(data: {slug: { eq: $slug }}) {
        data {
          title
          body
          date(formatString: "YYYY/MM/DD")
        }
      }
    }
`
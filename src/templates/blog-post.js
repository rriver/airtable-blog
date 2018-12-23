import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.css"
import Meta from "../components/meta"
import "../styles/prism-tomorrow.css"

class postTemplate extends React.Component {
  render(){
    const post = this.props.data
    
    return (
      <Layout>
        <Meta
          page="note"
          title={post.airtable.data.title}
          description={post.airtable.data.body.childMarkdownRemark.excerpt}
          slug={post.airtable.data.slug}
        />
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
  }
`
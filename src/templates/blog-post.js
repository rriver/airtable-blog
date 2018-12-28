import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-post.module.scss"
import Meta from "../components/meta"
import "../styles/prism-tomorrow.css"

class postTemplate extends React.Component {
  render(){
    const post = this.props.data

    let categories
    if(post.airtable.data.category != null){
      // let last = post.airtable.data.category.length - 1
      categories = post.airtable.data.category.map(({ data }, index) => (
        <span className={styles.tags} key={index}><Link to={`/category/${data.slug}/`}>{data.catname}</Link></span>
      ))
    }
    
    return (
      <Layout backLink={true}>
        <Meta
          page="note"
          title={post.airtable.data.title}
          description={post.airtable.data.body.childMarkdownRemark.excerpt}
          slug={post.airtable.data.slug}
        />
        <h1 className={styles.postTitle}>{post.airtable.data.title}</h1>
        <p className={styles.postDate}>Noted on {post.airtable.data.date}</p>
        <p className={styles.postCategories}>カテゴリ： {categories}</p>
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
        date(formatString: "YYYY/MM/DD @HH:mm")
        slug
        category {
          data {
            catname
            slug
          }
        }
      }
    }
  }
`
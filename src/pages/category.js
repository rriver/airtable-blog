import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Meta from "../components/meta"
import postStyles from "../templates/blog-post.module.scss"
import styles from "./category.module.scss"

class catListTemplate extends React.Component {
   render() {
      const cats = this.props.data

      return (
        <Layout backLink={false}>
          <Meta
            page="category"
            title="カテゴリ一覧"
            description="R noteのカテゴリ一覧"
            slug="categories"
          />
          <h1 className={postStyles.postTitle}>カテゴリ一覧</h1>
          <ul className={styles.catList}>
            {cats.allAirtable.edges.map(({ node }, index) => (
              <li key={index}>
                <Link
                  to={`category/${node.data.slug}/`}
                >{node.data.catname}
                </Link>
              </li>
            ))}
          </ul>
        </Layout>
      )
   }
}

export default catListTemplate

export const query = graphql`
query{
  allAirtable(
    filter: {
      table: {eq: "category"},
      data: {entry: {ne: null}}
    },
    sort: {fields: data___slug, order: ASC}
  ) {
    edges {
      node {
        data {
          catname
          slug
        }
      }
    }
  }
}
`
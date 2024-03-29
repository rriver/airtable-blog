import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "./blog-post.module.scss"
import * as indexStyles from "../pages/index.module.scss"
import Meta from "../components/meta"

class categoryTemplate extends React.Component {
  render(){
    const cat = this.props.data.category
    const posts = this.props.data.posts

    return (
      <Layout location="category" backLink={true}>
        <Meta
          page="category"
          title={`「${cat.data.catname}」関連のノート`}
          description={`「${cat.data.catname}」関連のノート`}
          slug={cat.data.slug}
        />
        <h1 className={styles.postTitle}>{`「${cat.data.catname}」関連のノート`}</h1>

        <ul className={indexStyles.postlist}>
          {posts.edges.map(({ node }, index) => (
            <li key={index}>
              <span>{node.data.date}</span><br />
              <Link
                to={`/${node.data.slug}`}
              >{node.data.title}
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default categoryTemplate

export const query = graphql`
  query($slug: String!){
    category: airtable(data: {slug: {eq: $slug}}) {
      data {
        catname
        slug
      }
    }
    posts: allAirtable(
      filter: {
        table: {eq: "entry"},
        data: {category: {elemMatch: {data: {slug: {eq: $slug}}}}}
      },
      sort: {fields: [data___date], order: DESC}
    ) {
      edges {
        node {
          data {
            title
            slug
            date(formatString: "YYYY年M月D日")
          }
        }
      }
    }
  }
`
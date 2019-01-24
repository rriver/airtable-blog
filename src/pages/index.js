import React from "react"
import { graphql, Link } from "gatsby"
import containerStyles from "../components/layout.module.scss"
import styles from "./index.module.scss"
import Meta from "../components/meta"
import Footer from "../components/footer"

class indexTemplate extends React.Component {
   render() {
      const posts = this.props.data.posts
      const category = this.props.data.category
      const siteMeta = this.props.data

      return (
         <div className={containerStyles.wrapper}>
            <Meta
               page="home"
            />
            <main>
               <h1 className={styles.blogtitle}>{siteMeta.site.siteMetadata.title}</h1>
               <p className={styles.intro}>{siteMeta.site.siteMetadata.description}</p>
               <div className={styles.catlist}>
                  <ul>
                     {category.edges.map(({ node }, index) => (
                        <li key={index}>
                           <Link
                              to={`category/${node.data.slug}/`}
                           >{node.data.catname}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
               <ul className={styles.postlist}>
                  {posts.edges.map(({ node }, index) => (
                     <li key={index}>
                        <span>{node.data.date}</span><br/>
                        <Link
                           to={`${node.data.slug}/`}
                        >{node.data.title}
                        </Link>
                     </li>
                  ))}
               </ul>
            </main>
            <Footer />
         </div>
      )
   }
}

export default indexTemplate

export const query = graphql`
   query {
      posts: allAirtable(
         sort: { fields: [data___date], order: DESC },
         filter: { table: {eq: "entry"}},
      ) {
         totalCount
         edges {
            node {
               data {
                  slug
                  title
                  date(formatString: "YYYY年M月D日")
                  image {
                     id
                     url
                  }
               }
            }
         }
      }
      category: allAirtable(
         filter: {
           table: {eq: "category"},
           data: {entry: {ne: null}}
         }
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
      site {
         siteMetadata {
            title
            siteUrl
            description
            twitter
         }
      }
   }
`
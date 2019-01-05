import React from "react"
import { graphql, Link } from "gatsby"
import containerStyles from "../components/layout.module.scss"
import styles from "./index.module.scss"
import Meta from "../components/meta"
import Footer from "../components/footer"

class indexTemplate extends React.Component {
   render() {
      const post = this.props.data

      return (
         <div className={containerStyles.wrapper}>
            <Meta
               page="home"
            />
            <main>
               <h1 className={styles.blogtitle}>{post.site.siteMetadata.title}</h1>
               <p className={styles.totalposts}>{post.allAirtable.totalCount} notes</p>
               <ul className={styles.postlist}>
                  {post.allAirtable.edges.map(({ node }, index) => (
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
      allAirtable(
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
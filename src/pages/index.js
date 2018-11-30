import React from "react"
import { graphql, Link } from "gatsby"
import containerStyles from "../components/layout.module.css"
import styles from "./index.module.css"

export default ({ data }) => {
   return (
      <div className={containerStyles.wrapper}>
         <h1 className={styles.blogtitle}>{data.site.siteMetadata.title}</h1>
         <ul className={styles.postlist}>
            {data.allAirtable.edges.map(({ node }, index) => (
               <li key={index}>
                  <Link
                     to={node.data.slug}
                  >{node.data.title} ({node.data.date})
                  </Link>
               </li>
            ))}
         </ul>
         <p className={styles.totalposts}>{data.allAirtable.totalCount} posts</p>
      </div>
   )
}

export const query = graphql`
   query {
      allAirtable(sort: { fields: [data___date], order: DESC }) {
         totalCount
         edges {
            node {
               data {
                  slug
                  title
                  date(formatString: "YYYY/MM/DD")
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
         }
      }
   }
`
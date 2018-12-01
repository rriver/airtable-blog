import React from "react"
import { graphql, Link } from "gatsby"
import containerStyles from "../components/layout.module.css"
import styles from "./index.module.css"
import Helmet from "react-helmet"

export default ({ data }) => {
   return (
      <div className={containerStyles.wrapper}>
         <Helmet>
            <title>R Note</title>
            <link rel="shortcut icon" href="https://parashuto.com/rriver/wp/wp-content/themes/rriver2/favicon.ico"></link>
         </Helmet>
         <main>
            <h1 className={styles.blogtitle}>{data.site.siteMetadata.title}</h1>
            <p className={styles.totalposts}>{data.allAirtable.totalCount} notes</p>
            <ul className={styles.postlist}>
               {data.allAirtable.edges.map(({ node }, index) => (
                  <li key={index}>
                     <span>{node.data.date}</span><br/>
                     <Link
                        to={node.data.slug}
                     >{node.data.title}
                     </Link>
                  </li>
               ))}
            </ul>
         </main>
         <footer>
            <p className={containerStyles.copyright}>Copyright &copy; 2018 Ryo Watanabe. All rights reserved.</p>
         </footer>
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
                  date(formatString: "YYYY/MM/DD HH:mm")
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
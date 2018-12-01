import React from "react"
import { graphql, Link } from "gatsby"
import containerStyles from "../components/layout.module.css"
import styles from "./index.module.css"
import Helmet from "react-helmet"

class indexTemplate extends React.Component {
   render() {
      const post = this.props.data

      return (
         <div className={containerStyles.wrapper}>
            <Helmet>
               <title>{post.site.siteMetadata.title}</title>
               <link rel="shortcut icon" href="https://parashuto.com/rriver/wp/wp-content/themes/rriver2/favicon.ico"></link>
               <meta name="title" content={post.site.siteMetadata.title} />
               <meta name="description" content="@Rriverのノート" />
               <meta property="og:title" content={post.site.siteMetadata.title} />
               <meta property="og:type" content="website" />
               <meta property="og:description" content="@Rriverのノート" />
               <meta property="og:url" content={post.site.siteMetadata.url} />
            </Helmet>
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
            <footer>
               <p className={containerStyles.copyright}>Copyright &copy; 2018 Ryo Watanabe. All rights reserved.</p>
            </footer>
         </div>
      )
   }
}

export default indexTemplate

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
            url
         }
      }
   }
`
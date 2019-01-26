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
      const catOrdered = category.edges.sort((a,b) => {
         let x = a.node.data.entry.length;
         let y = b.node.data.entry.length;

         let res = 0;
         if (x > y){
            res = -1;
         }
         if (x < y){
            res = 1;
         }
         return res;
      });
      const flagged = this.props.data.flagged
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
                     {catOrdered.map(({ node }, index) => (
                        <li key={index}>
                           <Link
                              to={`category/${node.data.slug}/`}
                           >{node.data.catname}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className={styles.flagged}>
                  <h2>FLAGGED</h2>
                  <ul>
                     {flagged.edges.map(({ node }, index) => (
                        <li key={index}>
                           <Link
                              to={`${node.data.slug}/`}
                           >{node.data.title}
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
               entry
               }
            }
         }
      }
      flagged: allAirtable(
         filter: {
            table: {eq: "entry"},
            data: {flag: {ne: null}}
         }
      ) {
         edges {
            node {
               data {
                  title
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
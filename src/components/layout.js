import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import styles from "./layout.module.css"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className={styles.wrapper}>
        <header>
        <Link to={`/`} className={styles.titleLink}>
          <h3 className={styles.blogTitle}>{data.site.siteMetadata.title}</h3>
        </Link>
        </header>
        <main>
        {children}
        </main>
        <footer>
          <p className={styles.copyright}>Copyright <span>©</span> 2018 Ryo Watanabe. All rights reserved.</p>
        </footer>
      </div>
    )}
  />
)
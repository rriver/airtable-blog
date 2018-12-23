import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import styles from "./layout.module.scss"
import Footer from "./footer"

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
          <Link to={`/`} className={styles.bottomLink}>
            一覧に戻る
          </Link>
        </main>
        <Footer />
      </div>
    )}
  />
)
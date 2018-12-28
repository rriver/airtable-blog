import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import styles from "./layout.module.scss"
import BackLink from "./back-link"
import Footer from "./footer"

export default ({ children, location, backLink }) => (
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
          {backLink ? <BackLink location={location} /> : '' }
        </main>
        <Footer />
      </div>
    )}
  />
)
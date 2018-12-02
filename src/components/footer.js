import React from "react"
import styles from "./footer.module.css"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            twitter
          }
        }
      }
    `}
    render={data => (
      <footer>
        <p className={styles.copyright}>Copyright <span>©</span> 2018 <a href="https://twitter.com/rriver/">{data.site.siteMetadata.twitter}</a></p>
      </footer>
    )}
  />
)
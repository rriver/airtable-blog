import React from "react"
import * as styles from "./footer.module.scss"
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
        <p className={styles.copyright}>Copyright <span>©</span> 2021 <a href="https://twitter.com/rriver/">{data.site.siteMetadata.twitter}</a></p>
      </footer>
    )}
  />
)
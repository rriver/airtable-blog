import React from "react"
import styles from "./footer.module.css"

export default () => {
  return(
    <footer>
      <p className={styles.copyright}>Copyright <span>©</span> 2018 <a href="https://twitter.com/rriver/">@Rriver</a></p>
    </footer>
  )
}
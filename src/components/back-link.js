import React from "react"
import { Link } from "gatsby"
import styles from "./back-link.module.scss"

function backLink({location}) {
  let linkTo, linkText

  linkTo = "/"
  linkText = "一覧に戻る"

  if(location==="category"){
    linkTo = "/category/"
    linkText = "カテゴリ一覧"
  }
  return (
    <p className={styles.bottomLink}>
      <Link to={linkTo}>
        {linkText}
      </Link>
    </p>
  )
}

export default backLink
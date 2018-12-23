import React from "react";
import Layout from "../components/layout";
import styles from "../templates/blog-post.module.css";
import Meta from "../components/meta";
import Nowhere from "../assets/no-where-in-sight.svg";

class notFoundTemplate extends React.Component {
  render() {
    return (
      <Layout>
        <Meta
          page="404"
          title="404 Page Not Found"
          description="ページが見つかりませんでした"
          slug="404"
        />
        <h1 className={styles.postTitle}>
          あ、ありませぬ...
        </h1>
        <img src={Nowhere} alt="FILE MISSING" />
      </Layout>
    );
  }
}

export default notFoundTemplate

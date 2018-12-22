import React from "react";
import { graphql, withPrefix } from "gatsby";
import Layout from "../components/layout";
import styles from "../templates/blog-post.module.css";
import Helmet from "react-helmet";
import Nowhere from "../assets/no-where-in-sight.svg";

class notFoundTemplate extends React.Component {
  render() {
    const post = this.props.data;

    return (
      <Layout>
        <Helmet htmlAttributes={{ lang: "ja" }}>
          <title>Page Not Found - {post.site.siteMetadata.title}</title>
          <link
            rel="shortcut icon"
            href="https://parashuto.com/rriver/wp/wp-content/themes/rriver2/favicon.ico"
          />
          <meta name="title" content={`"Page Note Found | "${post.site.siteMetadata.title}`} />
          <meta
            name="description"
            content={post.site.siteMetadata.description}
          />
          <meta property="og:title" content={`"Page Note Found | "${post.site.siteMetadata.title}`} />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content={post.site.siteMetadata.description}
          />
          <meta property="og:url" content={post.site.siteMetadata.siteUrl} />
          <meta
            property="og:image"
            content={`${post.site.siteMetadata.siteUrl}${withPrefix(
              "/img/rnote-logo-ogimage.png"
            )}`}
          />
          <meta property="twitter:card" content="summary" />
          <meta
            property="twitter:site"
            content={post.site.siteMetadata.twitter}
          />
          <meta
            property="twitter:creator"
            content={post.site.siteMetadata.twitter}
          />
          <meta
            property="twitter:title"
            content={`"Page Note Found | "${post.site.siteMetadata.title}`}
          />
          <meta
            property="twitter:description"
            content={post.site.siteMetadata.description}
          />
          <meta
            property="twitter:image"
            content={`${post.site.siteMetadata.siteUrl}${withPrefix(
              "/img/rnote-logo-ogimage.png"
            )}`}
          />
        </Helmet>
        <h1 className={styles.postTitle}>
          あ、ありませぬ...
        </h1>
        <img src={Nowhere} alt="FILE MISSING" />
      </Layout>
    );
  }
}

export default notFoundTemplate;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
        description
        twitter
      }
    }
  }
`;

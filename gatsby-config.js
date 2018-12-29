require("dotenv").config({
   path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `R note`,
    siteUrl: `https://rnote.work`,
    description: `@rriverの雑記ノートです。思ったことをそのまま書いてます`,
    twitter: `@rriver`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: (post) => {
              const rssMetadata = post.query.site.siteMetadata
              return post.query.allAirtable.edges.map(edge => ({
                date: edge.node.data.date,
                title: edge.node.data.title,
                description: edge.node.data.body.childMarkdownRemark.excerpt,
                url: rssMetadata.siteUrl + '/' + edge.node.data.slug,
                guid: rssMetadata.siteUrl + '/' + edge.node.data.slug,
                custom_elements: [
                  {
                    'content:encoded': edge.node.data.body.childMarkdownRemark.html,
                  },
                ],
              }))
            },
            query: `
            {
              allAirtable(
                limit: 1000,
                sort: { fields: [data___date], order: DESC },
                filter: { table: {eq: "entry"} }
              ) {
                edges {
                  node {
                    data {
                      title
                      date(formatString: "ddd, DD MMM YYYY, h:mm:ss +0900")
                      slug
                      body {
                        childMarkdownRemark {
                          excerpt
                          html
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
            output: "/rss.xml",
            title: "R note RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-130202268-1`,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
         apiKey: `${process.env.GATSBY_AIRTABLE_APIKEY}`,
         tables: [
            {
               baseId: 'appy2K4C7JMm8lJKu',
               tableName: 'entry',
               tableView: `${process.env.GATSBY_AIRTABLE_TABLEVIEW}`,
               queryName: '',
               mapping: { 'body': 'text/markdown' },
               tableLinks: ['category',],
            },
            {
              baseId: 'appy2K4C7JMm8lJKu',
              tableName: 'category',
              tableView: 'Active',
            }
         ]
      },
    },
    { resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          }
        ]
      }
    },
  ],
  pathPrefix: `/img`
}
require("dotenv").config({
   path: `.env.${process.env.NODE_ENV}`,
 })

module.exports = {
  siteMetadata: {
    title: `R note`,
    siteUrl: `https://rnote.work`,
    description: `@rriverの雑記ノートです。思ったことをそのまま書いてます。`,
    twitter: `@rriver`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-130202268-1`,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
         apiKey: `${process.env.GATSBY_AIRTABLE_APIKEY}`,
         tables: [
            {
               baseId: 'appy2K4C7JMm8lJKu',
               tableName: 'entry',
               tableView: 'Published',
               queryName: '',
               mapping: { 'body': 'text/markdown' },
            },
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
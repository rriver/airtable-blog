require("dotenv").config({
   path: `.env.${process.env.NODE_ENV}`,
 })

module.exports = {
  siteMetadata: {
    title: `R Note`,
    url: `https://rnote.work`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
         apiKey: `${process.env.GATSBY_AIRTABLE_APIKEY}`,
         tables: [
            {
               baseId: 'appy2K4C7JMm8lJKu',
               tableName: 'entry',
               tableView: 'Published',
               queryName: ''
            },
         ]
      },
    },
  ],
}
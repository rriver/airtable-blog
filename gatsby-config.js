require("dotenv").config({
   path: `.env.${process.env.NODE_ENV}`,
 })

module.exports = {
  siteMetadata: {
    title: `R Note`,
  },
  plugins: [
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
const path = require(`path`)

exports.createPages = ({ graphql, actions}) => {
   const { createPage } = actions
   return new Promise((resolve, reject) => {
      graphql(`
         {
            allAirtable {
               edges {
                  node {
                     data {
                        slug
                     }
                  }
               }
            }
         }
      `
      ).then(result => {
         result.data.allAirtable.edges.forEach(({ node }) => {
            createPage({
              path: node.data.slug,
              component: path.resolve(`./src/templates/blog-post.js`),
              context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.data.slug,
              },
            })
          })
         resolve()
      })
   })
}
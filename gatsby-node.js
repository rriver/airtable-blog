const path = require(`path`)

exports.createPages = ({ graphql, actions}) => {
   const { createPage } = actions
   
   const loadPages = new Promise((resolve, reject) => {
      graphql(`
         {
            allAirtable(
               filter: { table: {eq: "entry"} },
            ) {
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
                slug: node.data.slug,
              },
            })
          })
         resolve()
      })
   })

   const loadCategories = new Promise((resolve, reject) => {
      graphql(`
         {
            allAirtable(
               filter: {
                  table: {eq: "category"},
                  data: {entry: {ne: null}},
               },
               sort: {fields: [data___slug], order: ASC}
            ) {
               edges {
                  node {
                     data {
                        slug
                     }
                  }
               }
            }
         }
      `).then(result => {
         result.data.allAirtable.edges.forEach(({ node }) => {
            createPage({
               path: `/category/${node.data.slug}`,
               component: path.resolve(`./src/templates/category.js`),
               context: {
                  slug: node.data.slug,
               },
            })
         })
         resolve()
      })
   })

   return Promise.all([loadPages, loadCategories])
}
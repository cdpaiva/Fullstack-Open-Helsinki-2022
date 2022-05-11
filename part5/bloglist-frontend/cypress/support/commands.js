Cypress.Commands.add('login', user => { 
    cy.request('POST','http://localhost:3001/api/login',user)
      .then(res => {
            localStorage.setItem('loggedBloglistUser', JSON.stringify(res.body))
        })
    cy.visit('http://localhost:3000')
 })

Cypress.Commands.add('createBlog', newBlog => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: newBlog,
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})
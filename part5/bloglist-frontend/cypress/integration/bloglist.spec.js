describe('Bloglist app', function() {
    const user = {
        name: 'User test',
        username: 'user',
        password: 'user'
    }

    beforeEach(function() {
        cy.request('POST','http://localhost:3001/api/test/reset')
        cy.request('POST','http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Login Form')
    })

    describe('Login', function() {
        it('can login with right credentials', function() {
            cy.get('#username').type('user')
            cy.get('#password').type('user')
            cy.get('#login-button').click()
            cy.contains(`${user.name} is logged in`)
        })

        it('cannot login with wrong password', function() {
            cy.get('#username').type('user')
            cy.get('#password').type('wrong-user')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
            cy.get('.notification-error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })

        it('cannot login with wrong user', function() {
            cy.get('#username').type('wrong-user')
            cy.get('#password').type('user')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
            cy.get('.notification-error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When Logged in', function() {
        const newBlog = {
            title: 'Title test',
            author: 'Author test',
            url: 'URL test',
            user: 'user'
        }

        beforeEach(function() {
            cy.login(user)
        })

        it('a new note can be created', function() {
            cy.createBlog(newBlog)
            cy.contains('Title test')
        })

        it('can like a blog', function() {
            cy.createBlog(newBlog)
            cy.get('#blog-details-button').click()
            cy.get('#like-button').click()
            cy.contains(`You liked ${newBlog.title}`)
        })

        it('can delete a blog', function() {
            cy.createBlog(newBlog)
            
            cy.request('GET', 'http://localhost:3001/api/blogs/')
            .then(res => {
                const blogs = res.body
                const blogId = blogs[0].id

                cy.request({
                    url: `http://localhost:3001/api/blogs/${blogId}`,
                    method: 'DELETE',
                    headers: {
                      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
                    }
                })
            })
        })

        it('sorts blogs by likes', function() {
            cy.createBlog(newBlog)
            cy.createBlog({...newBlog, title: 'Title test 2'})

            cy.contains('Title test 2')
                .find('button')
                .click()
                .get('#like-button')
                .click()
                .click()

            cy.get('.blog-card').eq(0).contains('Title test 2')
        })
    })
})
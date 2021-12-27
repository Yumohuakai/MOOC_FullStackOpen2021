describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create a user to backend
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
      .should('contain', 'username')
      .should('contain', 'password')
      .should('contain', 'login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in - 1st Method', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('React patterns')
      cy.get('#author').type('Michael Chan')
      cy.get('#url').type('https://reactpatterns.com/')
      cy.get('#create-button').click()
      cy.get('.blog').should('contain', 'React patterns')
      cy.get('.blog').should('contain', 'Michael Chan')
    })
  })

  describe('When logged in  - 2nd Method by using cypress/support/commands.js', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        })
      })

      it('user can like a blog', function() {
        cy.contains('view').click()
        cy.get('.like').should('contain', '0')
        cy.contains('like').click()
        cy.get('.like').should('contain', '1')
      })

      it('user who created the blog, can delete it', function() {
        cy.contains('view').click()
        cy.get('.blog').should('contain', 'Matti Luukkainen')
        cy.contains('remove this blog').click()
      })
    })
  })

  describe('When mluukkai logged in', function() {
    beforeEach(function() {
      // create another user to backend
      const user = {
        name: 'Ann Kuu',
        username: 'aku',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    describe('and a blog was created by mluukkai', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        })
      })

      it('then another user: aku who did not create the blog, can not delete it', function() {
        cy.contains('logout').click()
        cy.get('#username').type('aku')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Ann Kuu logged in')
        cy.contains('view').click()
        cy.get('.blog').should('contain', 'Matti Luukkainen')
        cy.get('.blog').should('not.contain', 'remove this blog')
      })

    })
  })

})
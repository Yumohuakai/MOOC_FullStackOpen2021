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

    describe('and many blogs exists with the different amount of likes', function () {
      let mylikebtnid = ''
      beforeEach(function () {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 1
        })
        cy.createBlog({
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 2
        })
        cy.createBlog({
          title: 'Type wars',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
          likes: 3
        })

        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'GET',
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        }).then(data => {
          // console.log('---get data:', Array.isArray(data.body))
          const like_btn_id = data.body.map(b => b.title === 'Go To Statement Considered Harmful' ? b._id : '')
          // console.log('the id:------', like_btn_id)
          mylikebtnid = like_btn_id.filter(e => e)
          // console.log('final...id', mylikebtnid)
        })
      })

      it('then the blogs are ordered according to likes-field in the descending order originally', function() {
        cy.contains('view').click()
        cy.get('.like').should('contain', '3')
      })

      it('also the blogs are ordered according to likes-field in the descending order after the likes-field changed', function() {
        console.log('what is my...id', mylikebtnid)
        for (let i = 0; i<3; i++){
          cy.contains('view').click()
        }

        console.log(`what is my like button id -...... #${mylikebtnid}`)
        //To click the like-button 3 times of the first blog added in beforeEach(): likes = 1 + 3*1
        for (let i = 0; i<3; i++){
          cy.get(`#${mylikebtnid}`).click()
          cy.request({
            url: 'http://localhost:3003/api/blogs',
            method: 'GET',
            headers: {
              'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
            }
          }).then(data => {
          // console.log('---get data:', Array.isArray(data.body))
            const likes_amout = data.body.map(b => b.title === 'Go To Statement Considered Harmful' ? b.likes : '')
            console.log('the id:------', likes_amout)
            const mylikes = likes_amout.filter(e => e)
            console.log('final...id', mylikes)
          })
        }

        for (let i = 0; i<3; i++){
          cy.contains('hide').click()
        }
        cy.contains('view').click()
        cy.get('.like').should('contain', '4')
        cy.contains('Go To Statement Considered Harmful')
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
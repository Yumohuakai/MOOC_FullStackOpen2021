const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

// const logger = require('../utils/logger')
// const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


// beforeEach(async () => {
//   await Blog.deleteMany({})

//   for (let blog of helper.initialBlogs) {
//     let blogObject = new Blog(blog)
//     await blogObject.save()
//   }
// })

// test('blogs are returned as json', async () => {
//   logger.info('entered test')
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('all blogs are returned', async () => {
//   const response = await api.get('/api/blogs')
//   expect(response.body).toHaveLength(helper.initialBlogs.length)
// })

// test('the unique identifier property of the blog posts is named _id by default in MongoDB', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body[0]._id).toBeDefined()
// })

// test('a new blog can be added', async () => {
//   const newBlog = {
//     title: 'TDD harms architecture',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//     likes: 0,
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

//   const titles = blogsAtEnd.map(b => b.title)
//   expect(titles).toContainEqual(
//     'TDD harms architecture'
//   )
// })

// test('the likes will be set to 0, if a new blog added without the value of likes', async () => {
//   const newBlog = {
//     title: 'First class tests',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

//   const titles = blogsAtEnd.map(b => b.title)
//   expect(titles).toContainEqual(
//     'First class tests'
//   )

//   const likes = blogsAtEnd.map(b => b.likes)
//   //   logger.info('testing.------------', likes)
//   expect(likes.pop()).toBe(0)
// })

describe('addition of a blog with authentication', () => {
  let loggedInToken = ''
  beforeEach(async () => {
    const lit = await api
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({
        username: 'root',
        password: 'sekret'
      })
    loggedInToken = lit.body.token
    // logger.info('show the token---------', lit.body)
  })


  test('creation succeeds with valid token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    // logger.info('show the token----1-----', loggedInToken)
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loggedInToken}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContainEqual(
      'Type wars'
    )
  })

  test('creation fails with proper statuscode and message when the token is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'how to login when using jest',
      author: 'Kuu XXXX',
      url: 'http://test.html',
      likes: 32
    }

    const result = await api
      .post('/api/blogs')
      .set('Authorization', '')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('jwt must be provided')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('the blog without title and url is not added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'Ann Kuu',
      likes: 15,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loggedInToken}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})



// describe('deletion of a blog', () => {
//   test('succeeds with status code 204 if id is valid', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToDelete = blogsAtStart[0]

//     await api
//       .delete(`/api/blogs/${blogToDelete._id}`)
//       .expect(204)

//     const blogsAtEnd = await helper.blogsInDb()

//     expect(blogsAtEnd).toHaveLength(
//       helper.initialBlogs.length - 1
//     )

//     const titles = blogsAtEnd.map(r => r.title)

//     expect(titles).not.toContainEqual(blogToDelete.title)
//   })
// })

// describe('update of a blog', () => {
//   test('succeeds with status code 200 if id is valid', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToUpdate = blogsAtStart[0]

//     const blog = {
//       title: blogToUpdate.title,
//       author: blogToUpdate.author,
//       url: blogToUpdate.url,
//       likes: 5,
//     }

//     await api
//       .put(`/api/blogs/${blogToUpdate._id}`)
//       .send(blog)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//     const blogsAtEnd = await helper.blogsInDb()

//     expect(blogsAtEnd[0].likes).toBe(5)
//   })
// })

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is shorter than its miniLength(3)', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ak',
      name: '',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` (`ak`) is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is shorter than its miniLength(3)', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aku',
      name: '',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('the minimum length of password is 3')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})


afterAll(() => {
  mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const logger = require('../utils/logger')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  logger.info('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named _id by default in MongoDB', async () => {
  const response = await api.get('/api/blogs')
  //   logger.info('in test-----', response.body)
  //   logger.info('before changing model transfor id -------', typeof response.body[0].id)
  //   logger.info('after changing model transfor id -------', typeof response.body[0]._id)

  expect(response.body[0]._id).toBeDefined()
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContainEqual(
    'TDD harms architecture'
  )
})

test('the likes will be set to 0, if a new blog added without the value of likes', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContainEqual(
    'First class tests'
  )

  const likes = blogsAtEnd.map(b => b.likes)
  //   logger.info('testing.------------', likes)
  expect(likes.pop()).toBe(0)
})

test('the blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Ann Kuu',
    likes: 15,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
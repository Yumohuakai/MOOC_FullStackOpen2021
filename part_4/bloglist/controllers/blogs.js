const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const logger = require('../utils/logger')

// blogsRouter.get('/', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// async/await in the backend - instead the one above...
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(200).json(result)
//     })
// })

// async/await in the backend - instead the one above...
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  if (blog.title && blog.url) {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter
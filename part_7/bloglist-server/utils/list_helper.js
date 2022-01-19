// const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
// METHOD 1ST. to find the biggest number of blog.likes from the given list of blogs
//   const maxLikes = blogs.reduce((maxLikes, blog) =>
//     maxLikes > blog.likes
//       ? maxLikes
//       : blog.likes, 0)


  // METHOD 2ND. to find the biggest number of blog.likes from the given list of blogs
  const maxLikes = Math.max( ... blogs.map(blog => blog.likes))

  //   logger.info('maximum of likes:', maxLikes)

  const fav = blogs.find(blog => blog.likes === maxLikes)

  //   logger.info('favorite blog:', fav)

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}


const mostBlogs = (blogs) => {
  const countBlog = blogs.reduce((statisticsB, blog) => {
    // logger.info('1 - -----------', statisticsB)
    if (!statisticsB.map(e => e.author).includes(blog.author)) {
      statisticsB.push({
        author: blog.author,
        blogs: blogs.reduce((sum, b) =>
          b.author === blog.author
            ? sum + 1
            : sum, 0)
      })
    }
    return statisticsB
  }, [])

  const mostBlogNum = Math.max( ... countBlog.map(c => c.blogs))
  const mostB = countBlog.find(c => c.blogs === mostBlogNum)
  return mostB
}

const mostLikes = (blogs) => {
  const countBlogLikes = blogs.reduce((statisticsB, blog) => {
    if (!statisticsB.map(e => e.author).includes(blog.author)) {
      statisticsB.push({
        author: blog.author,
        likes: blogs.reduce((sum, b) =>
          b.author === blog.author
            ? sum + b.likes
            : sum, 0)
      })
    }
    return statisticsB
  }, [])

  const mostBlogLikesNum = Math.max( ... countBlogLikes.map(c => c.likes))
  const mostBL = countBlogLikes.find(c => c.likes === mostBlogLikesNum)
  //   logger.info('1 - -----------', countBlogLikes)
  //   logger.info('2 - -----------', mostBL)
  return mostBL
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
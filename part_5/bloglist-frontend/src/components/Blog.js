import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const [hideDetails, sethideDetails] = useState(true)
  const addLikePoints = () => {
    updateBlog(
      blog._id,
      { user: blog.user
        ? blog.user.id
        : null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
      }
    )
  }

  const deleteBlog = () => {
    removeBlog(blog._id)
  }
  const showMoreDetails = () => sethideDetails(!hideDetails)
  const label = hideDetails ? 'view' : 'hide'

  return (
    <div className='blog'>
      {blog.title} - {blog.author} &nbsp;
      <button onClick={showMoreDetails}> {label} </button>
      {hideDetails
        ? ''
        : <BlogDetails
          key={blog._id}
          blog={blog}
          addLikePoints={addLikePoints}
          deleteBlog={deleteBlog}
          username={username}
        />
      }
    </div>
  )
}
export default Blog
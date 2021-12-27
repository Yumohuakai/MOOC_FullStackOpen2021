import React from 'react'

const BlogDetails = ({ blog, addLikePoints, deleteBlog, username }) => (
  <div>
    <p>{blog.url}</p>
    <p className='like'>
      likes: {blog.likes} &nbsp;
      <button id={blog._id} onClick={addLikePoints}>like</button>
    </p>
    <p>
      {blog.user
        ? blog.user.name
        : ''
      }
    </p>
    {blog.user.username === username
      ? <p><button onClick={deleteBlog}>remove this blog</button></p>
      : ''
    }
  </div>
)

export default BlogDetails
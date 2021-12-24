import React, {useState} from 'react'

const BlogDetails = ({blog, addLikePoints, deleteBlog, username}) => (
  <div>
    <p>{blog.url}</p>
    <p>
      likes: {blog.likes} &nbsp;
      <button onClick={addLikePoints}>like</button>
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
const Blog = ({blog, updateBlog, removeBlog, username}) => {
  const [hideDetails, sethideDetails] = useState(true)
  const addLikePoints = () => {
    updateBlog(
      blog._id, 
      {user: blog.user
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

  return (
    <div  className='blog'>
      {blog.title} - {blog.author} &nbsp;
      <button onClick={() => sethideDetails(!hideDetails)}>
        {hideDetails ? 'view' : 'hide' }
      </button>
      {hideDetails
        ? ''
        : <BlogDetails 
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
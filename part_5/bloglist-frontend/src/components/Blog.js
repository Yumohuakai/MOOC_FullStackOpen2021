import React, {useState} from 'react'
// import Togglable from './Togglable'

const BlogDetails = ({blog}) => (
  <div>
    <p>{blog.url}</p>
    <p>
      likes: {blog.likes} &nbsp;
      <button>like</button>
    </p>
    <p>
      {blog.user
      ? blog.user.name
      : '' 
      }
    </p>
  </div>
  
)
const Blog = ({blog}) => {
  const [hideDetails, sethideDetails] = useState(true)

  return (
    <div  className='blog'>
      {blog.title} - {blog.author} &nbsp;
      <button onClick={() => sethideDetails(!hideDetails)}>
        {hideDetails ? 'view' : 'hide' }
      </button>
      {hideDetails
        ? ''
        : <BlogDetails blog={blog}/>
      }
    </div>  
  )
}
export default Blog
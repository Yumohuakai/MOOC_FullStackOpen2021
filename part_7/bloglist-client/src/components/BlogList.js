import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link,
} from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(({ blogs }) => {
    // console.log('inside BlogList----------blogs--', blogs)
    return blogs
  })

  return(
    <div className='bloglist'>
      <h2>BLOG LIST</h2>
      {blogs === null
        ? <p>no data</p>
        :[].concat(blogs)
          .sort((a, b) => a.likes > b.likes ? -1 : 1)
          .map(blog =>
            <div className='blog' key={blog._id}>
              <Link to={`/blogs/${blog._id}`}> {blog.title} - {blog.author} </Link>
            </div>
          )
      }
    </div>
  )
}

export default BlogList
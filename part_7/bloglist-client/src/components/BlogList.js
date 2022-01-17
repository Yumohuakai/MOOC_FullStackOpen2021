import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ removeBlog, updateBlog }) => {

  const blogs = useSelector(({ blogs }) => {
    // console.log('inside BlogList----------blogs--', blogs)
    return blogs
  })

  const user = useSelector(({ user }) => {
    // console.log('inside BlogList--------user----', user)
    return user
  })

  return(
    <div>
      <h2>BLOG LIST</h2>
      {blogs === null
        ? <p>no data</p>
        :[].concat(blogs)
          .sort((a, b) => a.likes > b.likes ? -1 : 1)
          .map(blog =>
            <Blog
              key={blog._id}
              blog={blog}
              username={user.username}
              removeBlog={removeBlog}
              updateBlog={updateBlog}
            />
          )
      }
    </div>
  )
}

export default BlogList
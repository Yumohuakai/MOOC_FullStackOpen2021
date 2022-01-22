import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link,
} from 'react-router-dom'
import { BlogListDiv, HeadTwo } from './StyledComponents'

const BlogList = () => {

  const blogs = useSelector(({ blogs }) => {
    // console.log('inside BlogList----------blogs--', blogs)
    return blogs
  })

  return(
    <div>
      <HeadTwo>BLOG LIST</HeadTwo>
      {blogs === null
        ? <p>no data</p>
        :[].concat(blogs)
          .sort((a, b) => a.likes > b.likes ? -1 : 1)
          .map(blog =>
            <BlogListDiv key={blog._id}>
              <Link to={`/blogs/${blog._id}`} className='link' > {blog.title} - {blog.author} </Link>
            </BlogListDiv>
          )
      }
    </div>
  )
}

export default BlogList
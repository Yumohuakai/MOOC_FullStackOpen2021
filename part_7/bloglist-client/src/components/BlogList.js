import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'
import Blog from './Blog'
// import { useSelector } from 'react-redux'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => {
    console.log('inside BlogList----------blogs--', blogs)
    return blogs
  })

  const user = useSelector(({ user }) => {
    console.log('inside BlogList--------user----', user)
    return user
  })

  // return(
  //   <div>
  //     <h2>BLOGLIST</h2>
  //     {blogs === null
  //       ? <p>no data</p>
  //       : [].concat(blogs)
  //         .sort((a, b) => a.likes  > b.likes ? -1 : 1)
  //         .map(blog =>
  //           <p key={blog._id}>
  //             {blog.title}
  //           </p>
  //         )
  //     }
  //   </div>
  // )

  return(
    <div>
      <h2>BLOG LIST</h2>
      {blogs === null
        ? <p>no data</p>
        :[].concat(blogs)
          .sort((a, b) => a.votes > b.votes ? -1 : 1)
          .map(blog =>
            <Blog
              key={blog._id}
              blog={blog}
              username={user.username}
              updateBlog={() =>
              {
                dispatch(likeBlog(blog))
                dispatch(addMessage(`you liked '${blog.title}'`, 5))
              }
              }
              removeBlog={() =>
              {
                dispatch(likeBlog(blog))
                dispatch(addMessage(`you liked '${blog.title}'`, 5))
              }
              }

            />
          )
      }
    </div>
  )
}

export default BlogList
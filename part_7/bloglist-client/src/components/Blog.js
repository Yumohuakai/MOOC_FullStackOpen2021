import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'


let deletedSucceed = 0

export const getDeletedSucceed = () => {
  return deletedSucceed
}

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()

  /*****************************increase like-point*****************************/
  const updateBlog = (blogObject) => {
    dispatch(likeBlog(blogObject))
    dispatch(addMessage(`Blog ${blogObject.title} by ${blogObject.author} is updated`, 5))
  }

  const addLikePoints = () => {
    updateBlog(
      { user: blog.user
        ? blog.user.id
        : null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      _id: blog._id
      }
    )
  }
  /****************************************************************************/
  /********************************remove blog*********************************/
  const removeBlog = (blogObject) => {
    const ok = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author} ?`)
    if (ok) {
      try {
        dispatch(deleteBlog(blogObject._id))
        dispatch(addMessage(`Blog ${blogObject.title} by ${blogObject.author} is removed`, 5))
        deletedSucceed = 1
      } catch (exception) {
        console.log('what is the exception happened when remove a blog', exception)
        dispatch(addMessage('something wrong', 5))
        deletedSucceed = 0
      }
    }
  }

  const handleRemoveBlog = () => {
    removeBlog(blog)
    getDeletedSucceed()
    // console.log('-----Blog.getDeletedSucceed-------', getDeletedSucceed)
  }
  /****************************************************************************/

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url} >{blog.url}</a>
      <p className='like'>
        likes: {blog.likes} &nbsp;
        <button id={blog._id} onClick={addLikePoints} >like</button>
      </p>
      <p>
      added by {blog.user
          ? blog.user.name
          : ''
        }
      </p>
      {blog.user.username === username
        ? <p><button onClick={handleRemoveBlog}>remove this blog</button></p>
        : ''
      }
    </div>
  )
}
export default Blog
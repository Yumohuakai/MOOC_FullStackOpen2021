import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'
import  { useField } from '../customFormHook'
import {
  useHistory,
} from 'react-router-dom'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  /*******************************create a comment*******************************/
  const newComment = useField('text')
  const { resetValue, ...restOfNewComment } = newComment

  const addComment = (blogObject) => {
    dispatch(commentBlog(blogObject))
    dispatch(addMessage(`The comment for Blog ${blogObject.title} by ${blogObject.author} is added`, 'success', 5))
    resetValue()
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    // console.log('---component ---Blog.js---handleAddComment---blog.user', blog.user)
    addComment(
      {
        user: blog.user
          ? blog.user
          : null,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        _id: blog._id,
        comments: blog.comments.concat(restOfNewComment.value)
      }
    )
  }
  /******************************************************************************/

  /*****************************increase like-point*****************************/
  const updateBlog = (blogObject) => {
    dispatch(likeBlog(blogObject))
    dispatch(addMessage(`Blog ${blogObject.title} by ${blogObject.author} is updated`, 'success', 5))
  }

  const addLikePoints = () => {
    // console.log('---component ---Blog.js------updateBlog----- blog.user', blog.user)
    updateBlog(
      {
        user: blog.user
          ? blog.user
          : null,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        comments: blog.comments,
        _id: blog._id,
        likes: blog.likes + 1,
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
        dispatch(addMessage(`Blog ${blogObject.title} by ${blogObject.author} is removed`, 'success', 5))
        history.push('/')
      } catch (exception) {
        console.log('what is the exception happened when remove a blog', exception)
        dispatch(addMessage('something wrong', 'error', 5))
      }
    }
  }
  /****************************************************************************/

  const generateId = () =>
    Math.floor(Math.random() * 100000000)

  if ( !blog ) {
    return (<div> no data </div>)
  }
  return (
    <div>
      <h2> {blog.title} - {blog.author} </h2>

      <a href={blog.url} >{blog.url}</a>

      <p>
        likes: {blog.likes} &nbsp;
        <button id={blog._id} onClick={addLikePoints} >like</button>
      </p>

      <p>
        added by {blog.user
          ? blog.user.name
          : ''
        }
      </p>

      <div>
        {blog.user
          ? blog.user.username === username
            ? <p><button onClick={() => removeBlog(blog)}>remove this blog</button></p>
            : ''
          :''
        }
      </div>

      <div>
        <h3> comments</h3>
        <div>
          <form onSubmit={handleAddComment}>
            <input { ...restOfNewComment} /> &nbsp;
            <button type="submit">add comment</button>
          </form>
        </div>

        <ul>
          {blog.comments.length !== 0
            ?  blog.comments.map(c =>
              <li key={generateId()}>
                {c}
              </li>
            )
            : null}
        </ul>
      </div>
    </div>
  )
}
export default Blog
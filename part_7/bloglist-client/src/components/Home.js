import React, { useRef } from 'react'
import BlogList from './BlogList'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import  { useField } from '../customFormHook'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'

const Home = () => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const removeProp = 'resetValue'
  const { [removeProp]: resetValueOfNewTitle, ...restOfNewTitle } = newTitle
  const { [removeProp]: resetValueOfNewAuthor, ...restOfNewAuthor } = newAuthor
  const { [removeProp]: resetValueOfNewUrl, ...restOfNewUrl } = newUrl

  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => {
    // console.log('inside BlogList----------blogs--', blogs)
    return blogs
  })

  const user = useSelector(({ user }) => {
    // console.log('inside BlogList--------user----', user)
    return user
  })

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject, user))
    dispatch(addMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added`, 5))
  }

  const removeBlog = (id) => {
    const blogObject = blogs.find(b => b._id === id)
    const ok = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author} ?`)
    if (ok) {
      try {
        dispatch(deleteBlog(id))
        dispatch(addMessage(`Blog ${blogObject.title} by ${blogObject.author} is removed`, 5))
      } catch (exception) {
        console.log('what is the exception happened when remove a blog', exception)
        dispatch(addMessage('something wrong', 5))
      }
    }
  }

  const updateBlog = (blogObject) => {
    dispatch(likeBlog(blogObject))
    dispatch(addMessage(`Blog ${blogObject.title} by ${blogObject.author} is updated`, 5))
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm
        newBlog={addBlog}
        resetValueOfNewTitle={resetValueOfNewTitle}
        restOfNewTitle={restOfNewTitle}
        resetValueOfNewAuthor={resetValueOfNewAuthor}
        restOfNewAuthor={restOfNewAuthor}
        resetValueOfNewUrl={resetValueOfNewUrl}
        restOfNewUrl={restOfNewUrl}
      />
    </Togglable>
  )

  return (
    <div>
      <div> {blogForm()} </div>
      <BlogList removeBlog={removeBlog} updateBlog={updateBlog} />
    </div>
  )
}

export default Home
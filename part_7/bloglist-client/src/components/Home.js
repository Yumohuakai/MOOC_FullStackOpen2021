import React, { useRef } from 'react'
import BlogList from './BlogList'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'

const Home = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    // console.log('inside BlogList--------user----', user)
    return user
  })

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject, user))
    dispatch(addMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added`, 'success', 5))
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm newBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <div> {blogForm()} </div>
      <BlogList />
    </div>
  )
}

export default Home
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, getUserFromLocalStorage } from './reducers/userReducer'
import { addMessage } from './reducers/notificationReducer'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetValue
  }
}

const App = () => {
  const username = useField('text')
  const password = useField('text')
  const removeProp = 'resetValue'
  const { [removeProp]: resetValueOfUsername, ...restOfUsername } = username
  const { [removeProp]: resetValueOfPassword, ...restOfPassword } = password

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const { [removeProp]: resetValueOfNewTitle, ...restOfNewTitle } = newTitle
  const { [removeProp]: resetValueOfNewAuthor, ...restOfNewAuthor } = newAuthor
  const { [removeProp]: resetValueOfNewUrl, ...restOfNewUrl } = newUrl

  const dispatch = useDispatch()

  const loginedUser = useSelector(state => state)
  // console.log('what is user----', loginedUser)

  useEffect(() => {
    if (loginedUser.user) {
      dispatch(initializeBlogs())
      // console.log('--------all blogs', loginedUser.blogs)
    }
  }, [loginedUser.user, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    // console.log('--------loggedUserJSON-----------', loggedUserJSON)
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON)
      // console.log('--------localUser-----------', localUser)
      dispatch(getUserFromLocalStorage(localUser))
      blogService.setToken(localUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username.value, password.value ))
      resetValueOfUsername()
      resetValueOfPassword()
      dispatch(addMessage('Login succeed', 5))
    } catch (exception) {
      dispatch(addMessage('Wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(addMessage('Logout succeed', 5))
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject, loginedUser.user))
    dispatch(addMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added`, 5))
  }

  const removeBlog = (id) => {
    const blogObject = loginedUser.blogs.find(b => b._id === id)
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

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input { ...restOfUsername} />
        </div>
        <div>
        password
          <input { ...restOfPassword} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>

  )

  const homepage = () => (
    <div>
      <h2>Blogs App</h2>
      <p>
        {loginedUser.user.name} logged-in
            &nbsp;
        <button onClick={handleLogout}> logout </button>
      </p>
      <div> {blogForm()} </div>
      <BlogList removeBlog={removeBlog} updateBlog={updateBlog} />
    </div>
  )

  return (
    <div>
      <Notification />
      {loginedUser.user === null && loginForm()}
      {loginedUser.user !== null && homepage()}
    </div>
  )
}

export default App
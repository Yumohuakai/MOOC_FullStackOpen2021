import React, { useState, useEffect } from 'react'
// import React, { useState } from 'react'
// import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, getUserFromLocalStorage } from './reducers/userReducer'
import { addMessage } from './reducers/notificationReducer'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'

// import Togglable from './components/Togglable'

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
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const username = useField('text')
  const password = useField('text')
  const removeProp = 'resetValue'
  const { [removeProp]: resetValueOfUsername, ...restOfUsername } = username
  const { [removeProp]: resetValueOfPassword, ...restOfPassword } = password

  const dispatch = useDispatch()

  const loginedUser = useSelector(state => state)
  console.log('what is user----', loginedUser)

  useEffect(() => {
    if (loginedUser.user) {
      // window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginedUser.user))
      // blogService.setToken(loginedUser.user.token)
      dispatch(initializeBlogs())
      console.log('--------all blogs', loginedUser.blogs)
    }
  }, [loginedUser.user, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('--------loggedUserJSON-----------', loggedUserJSON)
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON)
      console.log('--------localUser-----------', localUser)
      dispatch(getUserFromLocalStorage(localUser))
      console.log('-----useEffect------loginedUser-----------', loginedUser)
      if (localUser) {
        blogService.setToken(localUser.token)
      }
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // dispatch(loginUser(username.value, password.value ))
    // dispatch(addMessage('Login succeed', 5))
    // window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginedUser.user))
    // blogService.setToken(loginedUser.user.token)
    // resetValueOfUsername()
    // resetValueOfPassword()
    try {
      dispatch(loginUser(username.value, password.value ))
      resetValueOfUsername()
      resetValueOfPassword()
      // if (loginedUser.user) {
      dispatch(addMessage('Login succeed', 5))
      // window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginedUser.user))
      // blogService.setToken(loginedUser.user.token)
      // }
    } catch (exception) {
      dispatch(addMessage('Wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    // console.log('now we will logout..............')
    // window.localStorage.removeItem('loggedBlogappUser')
    // setUser(null)
    // showNotificationMessage('Logout succeed')
    dispatch(logoutUser())
    dispatch(addMessage('Logout succeed', 5))
  }

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
      <h3>Hello welcome to new world !</h3>
      <p>
        {loginedUser.user.name} logged-in
            &nbsp;
        <button onClick={handleLogout}> logout </button>
      </p>
      <BlogList />
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
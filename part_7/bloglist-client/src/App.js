import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, getUserFromLocalStorage } from './reducers/userReducer'
import { addMessage } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import UserList from './components/UserList'
import User from './components/User'
import Home from './components/Home'
import Blog from './components/Blog'
import { useField } from './customFormHook'
import userService from './services/users'
import { getDeletedSucceed } from './components/Blog'

import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const loginedUser = useSelector(state => state)
  // console.log('what is user----', loginedUser)


  /**********************************keep login user*************************/
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
  /****************************************************************************/

  /***************************blog list****************************************/
  useEffect(() => {
    if (loginedUser.user) {
      dispatch(initializeBlogs())
      // console.log('--------all blogs', loginedUser.blogs)
    }
  }, [loginedUser.user, dispatch])

  const blogMatch = useRouteMatch('/blogs/:id')

  let blog
  if (blogMatch && loginedUser.blogs) {
    blog = loginedUser.blogs.find(b => b._id === blogMatch.params.id)
    // console.log('what is singleUser----blog----', blog)
  }
  let isRemoved = getDeletedSucceed()
  // console.log('is it removed----------', isRemoved)
  /*****************************************************************************/

  /**********************************user list**********************************/
  const [users, setUsers] = useState(null)
  useEffect(() => {
    if (loginedUser.user) {
      userService
        .getAll()
        .then(users =>
          setUsers(users)
        )
    // console.log('--------all users', users)
    }
  }, [loginedUser.user])

  const userMatch = useRouteMatch('/users/:id')

  let singleUser
  if (userMatch && users) {
    singleUser = users.find(u => u.id === userMatch.params.id)
  }
  /****************************************************************************/

  /*******************************user login/logout*****************************/
  // user login/logout part
  const username = useField('text')
  const password = useField('text')
  const removeProp = 'resetValue'
  const { [removeProp]: resetValueOfUsername, ...restOfUsername } = username
  const { [removeProp]: resetValueOfPassword, ...restOfPassword } = password

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

  const loginForm = () => (
    <div>
      <h1>Login</h1>
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
  /****************************************************************************/

  const homepage = () => (
    <div>
      <h1>Blogs App</h1>
      <p>
        {loginedUser.user.name} logged-in
            &nbsp;
        <button onClick={handleLogout}> logout </button>
      </p>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blog} username={loginedUser.user.username} />
          {isRemoved ? <Redirect to="/" /> : null}
        </Route>
        <Route path="/users/:id">
          <User singleUser={singleUser} />
        </Route>
        <Route path="/users">
          <UserList users={users} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
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
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
import { useField } from './customFormHook'
import userService from './services/users'

import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const loginedUser = useSelector(state => state)
  // console.log('what is user----', loginedUser)


  /**********************************keep logined user***************************/
  useEffect(() => {
    if (loginedUser.user) {
      dispatch(initializeBlogs())
      // console.log('--------all blogs', loginedUser.blogs)
    }
  }, [loginedUser.user, dispatch])
  /****************************************************************************/
  /***************************blog list****************************************/
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

  const match = useRouteMatch('/users/:id')

  let singleUser
  if (match && users) {
    // console.log('what is id........', match.params.id)
    singleUser = users.find(u => u.id === match.params.id)
    // console.log('what is singleUser----Users--myuser--', singleUser)
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
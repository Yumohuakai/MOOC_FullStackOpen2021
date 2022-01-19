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
import {
  Switch,
  Link,
  Route,
  useRouteMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const loginedUser = useSelector(state => state)
  // console.log('what is user----', loginedUser.user)


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
  }, [loginedUser.blogs])

  const userMatch = useRouteMatch('/users/:id')

  let singleUser
  if (userMatch && users) {
    singleUser = users.find(u => u.id === userMatch.params.id)
  }
  /****************************************************************************/

  /***************************blog list****************************************/
  useEffect(() => {
    if (loginedUser.user) {
      dispatch(initializeBlogs())
      // console.log('--------all blogs', loginedUser.blogs)
    }
  }, [loginedUser.user])

  const blogMatch = useRouteMatch('/blogs/:id')

  let blog
  if (blogMatch && loginedUser.blogs) {
    blog = loginedUser.blogs.find(b => b._id === blogMatch.params.id)
    // console.log('what is single----blog----', blog)
  }
  /*****************************************************************************/

  /*******************************user login/logout*****************************/
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
      <Notification />
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
      <div className='navigation'>
        <Link className='linkStyle' to="/">blogs</Link>
        <Link className='linkStyle' to="/users">users</Link>
        <span className='loginUserInfo'>
          {loginedUser.user
            ? <em>{loginedUser.user.name} logged-in</em>
            : null
          }
        </span>
        <span className='logoutButton'>
          <button onClick={handleLogout}> logout </button>
        </span>
      </div>
      <Notification />
      <h1>Blogs App</h1>

      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blog} username={loginedUser.user.username} />
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
      {loginedUser.user
        ? homepage()
        : loginForm()
      }
    </div>
  )
}

export default App
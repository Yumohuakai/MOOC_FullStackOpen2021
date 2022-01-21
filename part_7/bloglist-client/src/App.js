import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, getUserFromLocalStorage } from './reducers/userReducer'
// import { addMessage } from './reducers/notificationReducer'
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
    dispatch(loginUser(username.value, password.value ))
    resetValueOfUsername()
    resetValueOfPassword()
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const loginForm = () => (
    <div>
      <Notification />

      <div className="login">
        <div className="login_header">
          <h1>BLOG APP</h1>
        </div>
        <div className="login_form">
          <form onSubmit={handleLogin}>
            <div className="login_form_body">
              <div className="form_input">
                <input autoFocus required placeholder="username" { ...restOfUsername} />
              </div>
              <div className="form_input">
                <input required placeholder="password" { ...restOfPassword} />
              </div>
              <div className="login_form_submit">
                <input  type="submit" value="Login"/>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
  /****************************************************************************/

  const homepage = () => (
    <div>
      <div className='nav'>
        <div  className='nav_left'>
          <div className='nav_left_app_name'>
            <h1>Blogs App</h1>
          </div>
          <div className='nav_left_link'>
            <Link to="/">BLOGS</Link>
          </div>
          <div className='nav_left_link'>
            <Link to="/users">USERS</Link>
          </div>
        </div>

        <div  className='nav_right'>
          <div className='nav_right_btn'>
            <button onClick={handleLogout}> Logout </button>
          </div>
          <div className='nav_right_user'>
            {loginedUser.user
              ? <em>{loginedUser.user.name}</em>
              : null
            }
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className='body_layer_1' >
        <Notification />
      </div>


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
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
import {
  Button,
  FormButton,
  NavigationHead,
  NavDivLink,
  FormHeadDiv,
  InputLogin,
  LoginFormOuterDiv,
  LoginFormInnerDiv,
  FormDiv,
  NavigationRightBtnDiv,
  NavigationRightUserDiv,
  NavigationRightDiv,
  NavigationLeftDiv,
  NavAppDiv,
  NavDiv,
  BodyFirstDiv,
  ClearBothDiv
} from './components/StyledComponents'

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

      <LoginFormOuterDiv>
        <FormHeadDiv>
          <h1>BLOG APP</h1>
        </FormHeadDiv>
        <FormDiv>
          <form onSubmit={handleLogin}>
            <LoginFormInnerDiv>
              <div>
                <InputLogin autoFocus required placeholder="username" { ...restOfUsername} />
              </div>
              <div>
                <InputLogin required placeholder="password" { ...restOfPassword} />
              </div>
              <div className="login_form_submit">
                <FormButton  type="submit"> Login </FormButton>
              </div>
            </LoginFormInnerDiv>
          </form>
        </FormDiv>
      </LoginFormOuterDiv>

    </div>
  )
  /****************************************************************************/

  const homepage = () => (
    <div>
      <NavDiv>
        <NavigationLeftDiv>
          <NavAppDiv>
            <NavigationHead>Blogs App</NavigationHead>
          </NavAppDiv>
          <NavDivLink>
            <Link to="/"  className='link' >BLOGS</Link>
          </NavDivLink>
          <NavDivLink>
            <Link to="/users"  className='link' >USERS</Link>
          </NavDivLink>
        </NavigationLeftDiv>

        <NavigationRightDiv>
          <NavigationRightBtnDiv>
            <Button onClick={handleLogout}> Logout </Button>
          </NavigationRightBtnDiv>
          <NavigationRightUserDiv>
            {loginedUser.user
              ? <em>{loginedUser.user.name}</em>
              : null
            }
          </NavigationRightUserDiv>
        </NavigationRightDiv>
      </NavDiv>

      <ClearBothDiv></ClearBothDiv>
      <BodyFirstDiv>
        <Notification />
      </BodyFirstDiv>


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
import React, { useState } from 'react'
// import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from './reducers/userReducer'
import { addMessage } from './reducers/notificationReducer'
import Notification from './components/Notification'
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

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username.value, password.value ))
    dispatch(addMessage('Login succeed', 5))
    // setUsername('')
    // setPassword('')
    // username.resetValue()
    // password.resetValue()
    resetValueOfUsername()
    resetValueOfPassword()
  }

  const handleLogout = () => {
    // console.log('now we will logout..............')
    // window.localStorage.removeItem('loggedBlogappUser')
    // setUser(null)
    // showNotificationMessage('Logout succeed')
    dispatch(logoutUser())
    dispatch(addMessage('Logout succeed', 5))
  }

  const loginedUser = useSelector(state => state)
  console.log('what is user----', loginedUser)

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
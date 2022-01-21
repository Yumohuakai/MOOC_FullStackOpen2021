import loginService from '../services/login'
import blogService from '../services/blogs'
import { addMessage } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return state = action.data
  case 'LOGOUT':
    return state = null
  case 'SET_USER':
    return state = action.data
  default:
    return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(addMessage('Login succeed', 'success', 5))
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(addMessage('Wrong username or password', 'error', 5))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(addMessage('Logout succeed', 'success', 5))
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const getUserFromLocalStorage = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export default userReducer
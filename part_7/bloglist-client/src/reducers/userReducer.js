import loginService from '../services/login'
import blogService from '../services/blogs'

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
    const user = await loginService.login({ username, password, })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
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
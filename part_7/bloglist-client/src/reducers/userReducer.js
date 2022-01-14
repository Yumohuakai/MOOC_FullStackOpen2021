import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    console.log('----------userReducer----LOGIN----state----------', state)
    return state = action.data
  case 'LOGOUT':
    console.log('----------userReducer----LOGOUT----state----------', state)
    return state = null
  case 'SET_USER':
    console.log('----------userReducer----SET_USER----state----------', state)
    return state = action.data
  default:
    console.log('----------userReducer----default----state----------', state)
    return state
  }
}

export const loginUser = (username, password) => {
  // try {

  //     const user = await loginService.login({ username, password, })


  //     //   window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
  //     //   noteService.setToken(user.token)
  //     // setUser(user)
  //     // setUsername('')
  //     // setPassword('')
  //   } catch (exception) {
  //     //   setErrorMessage('Wrong credentials')
  //     //   setTimeout(() => {
  //     //     setErrorMessage(null)
  //     //   }, 5000)
  //     console.log('Wrong credentials')
  //   }
  return async dispatch => {
    // console.log('----------loginUser-----')
    // console.log('logging in with', username, password)
    const user = await loginService.login({ username, password, })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    console.log('what is loginUser-----user', user)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    console.log('----------logoutUser-----')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const getUserFromLocalStorage = (user) => {
  return dispatch => {
    console.log('----------getUserFromLocalStorage-----')
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export default userReducer
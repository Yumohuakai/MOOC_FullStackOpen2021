import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return state = action.data
  case 'LOGOUT':
    return state = null
  default:
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
    console.log('----------loginUser-----')
    console.log('logging in with', username, password)
    const user = await loginService.login({ username, password, })
    console.log('what is loginUser-----user', user)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    // loginService.setToken(user.token)
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

export default userReducer
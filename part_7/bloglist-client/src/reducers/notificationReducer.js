let timeoutID

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return state = action.data.message
  case 'REMOVE_MESSAGE':
    return state = null
  default:
    return state
  }
}

export const addMessage = (message, timeInSeconds) => {
  return dispatch => {
    dispatch({
      type: 'ADD_MESSAGE',
      data: { message }
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      })
    }, timeInSeconds * 1000)
  }
}

export default notificationReducer
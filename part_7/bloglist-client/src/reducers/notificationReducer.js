let timeoutID

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return action.data
  case 'REMOVE_MESSAGE':
    return state = null
  default:
    return state
  }
}

export const addMessage = (message, styleType, timeInSeconds) => {
  return dispatch => {
    // console.log('----notificationReducer----styleType', styleType)
    dispatch({
      type: 'ADD_MESSAGE',
      data: {
        message: message,
        styleType: styleType,
      }
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
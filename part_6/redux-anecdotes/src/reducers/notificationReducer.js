const initialNotification = null
let timeoutID

const notificationReducer = (state = initialNotification, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_MESSAGE': 
            return state = action.data.message
        case 'REMOVE_MESSAGE': 
            return state = initialNotification
        case 'CLEAR_MESSAGE': 
            return state
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
        timeoutID = setTimeout(() => {
            dispatch(removeMessage())
          }, timeInSeconds * 1000)        
    }
}


const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

export const clearTimeOutMessage = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
        clearTimeout(timeoutID)
    }
}

export default notificationReducer
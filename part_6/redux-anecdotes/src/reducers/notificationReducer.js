const initialNotification = null

const notificationReducer = (state = initialNotification, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_MESSAGE': 
            return state = action.data.message
        case 'REMOVE_MESSAGE': 
            return state = initialNotification
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
        setTimeout(() => {
            dispatch(removeMessage())
          }, timeInSeconds * 1000)
    }
}


export const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

export default notificationReducer
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'INIT_ANECDOTES':
        return action.data
    case 'NEW_ANECDOTE':
      return [ ...state, action.data]
    case 'VOTE_ANECDOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecd => 
          anecd.id !== id ? anecd : changedAnecdote
      )
    }
    default:
      return state
  }  
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const newAnecdote = await anecdoteService.updateVotes(changedAnecdote)
    console.log('hi...---, newAnecdote from await-updateVotes----------', newAnecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: changedAnecdote,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
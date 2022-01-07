import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addMessage, clearTimeOutMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVoteClick }) => {
  return(
    <div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleVoteClick}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  // const toVoteAnecdote = (event) => {
  //   console.log('voting----------', event.target)
    // dispatch(voteAnecdote(anecdote))
    // dispatch(addMessage(`you voted '${anecdote.content}'`, 5))
  // }

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })



  return(
    <div>
        {[].concat(anecdotes)
           .sort((a, b) => a.votes > b.votes ? -1 : 1)
           .map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVoteClick={() => 
                      {
                        dispatch(voteAnecdote(anecdote))
                        dispatch(clearTimeOutMessage())
                        dispatch(addMessage(`you voted '${anecdote.content}'`, 5))
                      }
                    }
                />
           )
        }
    </div>
  )
}

export default AnecdoteList
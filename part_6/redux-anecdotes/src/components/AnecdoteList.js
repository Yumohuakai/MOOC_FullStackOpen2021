import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)

  return(
    <div>
        {[].concat(anecdotes)
           .sort((a, b) => a.votes > b.votes ? -1 : 1)
           .map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVoteClick={() => dispatch(voteAnecdote(anecdote.id))}
                />
           )
        }
    </div>
  )
}

export default AnecdoteList
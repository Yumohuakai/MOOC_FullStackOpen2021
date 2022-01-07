import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addMessage } from '../reducers/notificationReducer'

// const AnecdoteForm = (props) => {
//     const dispatch = useDispatch()

//     const addAnecdote = async (event) => {
//       event.preventDefault()
//       const content = event.target.anecdote.value
//       event.target.anecdote.value = ''
//       dispatch(createAnecdote(content))
//       dispatch(addMessage(`the new anecdote '${content}' is created`, 5))
//     }

//   return (
//     <div>
//         <h2>create new</h2>
//         <form onSubmit={addAnecdote}>
//             <div><input name="anecdote" /></div>
//             <button type="submit">create</button>
//     </form>
//     </div>
    
//   )
// }

// export default AnecdoteForm

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.addMessage(`the new anecdote '${content}' is created`, 5)
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
    </form>
    </div>
    
  )
}

const mapDispatchToProps = {
  createAnecdote,
  addMessage,
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
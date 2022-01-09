import React, { useState } from 'react'
import  { useField } from './hooks'
import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
} from "react-router-dom"

let createdSucceed

const Menu = ({addNew, anecdotes, showNotificationMessage, notification}) => {
  const padding = {
    paddingRight: 5
  }

  // console.log('did you find anecdotes----------', anecdotes)
  const match = useRouteMatch('/anecdotes/:id')
  // console.log('did you find match----------', match)
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  // console.log('did you find anecdote----------', anecdote)

  return (
    <div>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
        <Notification notification={notification} /> 
      </div>

      <Switch>  
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>      
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} showNotificationMessage={showNotificationMessage} /> 
          {createdSucceed ? <Redirect to="/" /> : null}
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      
    </div>
    

  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see {anecdote.info}</div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  createdSucceed = 0
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const removeProp = 'resetValue'
  const {[removeProp]: resetValueOfContent, ...restOfContent} = content
  const {[removeProp]: resetValueOfAuthor, ...restOfAuthor} = author
  const {[removeProp]: resetValueOfInfo, ...restOfInfo} = info

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.showNotificationMessage(`a new anecdote ${content.value} created !`)
    createdSucceed = 1
  }

  const clearHandler = () => {
    content.resetValue()
    author.resetValue()
    info.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input { ...restOfContent} />
        </div>
        <div>
          author <input { ...restOfAuthor} />
        </div>
        <div>
          url for more info <input { ...restOfInfo} />
        </div>
        <button>create</button>        
      </form>
      <button onClick={clearHandler}>reset</button>
    </div>
  )

}

const Notification = ({ notification}) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16, 
    background: 'lightgrey',
    borderStyle: 'solid'
  }

  if (notification === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  
  const [notification, setNotification] = useState(null)

  const showNotificationMessage = (message, type='success', timeInSeconds=10) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, timeInSeconds*1000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu 
        addNew={addNew} 
        anecdotes={anecdotes} 
        showNotificationMessage={showNotificationMessage}
        notification={notification} 
      />           
      <Footer />
    </div>
  )
}

export default App;
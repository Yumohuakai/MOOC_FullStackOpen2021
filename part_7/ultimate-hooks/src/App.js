  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = ()=> {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetValue
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [createdNew, setCreatedNew] = useState(0)

  useEffect(() => {
    axios.get(baseUrl)
      .then(initialData => {
        setResources(initialData.data)
        setCreatedNew(2)
      })
  }, [createdNew, baseUrl])

  const create = async (resource) => {
    // console.log('create----------resource----', resource)
    const response = await axios.post(baseUrl, resource)
    // console.log('create----------response.data----', response.data)
    setCreatedNew(1) 
    return response.data
  }  

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const removeProp = 'resetValue'
  const {[removeProp]: resetValueOfContent, ...restOfContent} = content
  const {[removeProp]: resetValueOfName, ...restOfName} = name
  const {[removeProp]: resetValueOfNumber, ...restOfNumber} = number

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  // console.log('what is the list of notes--------', notes)

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.resetValue()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.resetValue()
    number.resetValue()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...restOfContent} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...restOfName} /> <br/>
        number <input {...restOfNumber} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
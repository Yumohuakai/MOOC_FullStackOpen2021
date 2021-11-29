import React, { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] =  useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhonenum, setNewPhoneNum] = useState('')
  const [searchName, setSearchName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    // console.log('button clicked: ', event.target)

    if (persons.find(person => person.name === newName)){
      // console.log('the name is already there')
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name : newName,
        number : newPhonenum,
        id : persons.length + 1,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhoneNum('')
    }    
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handlePhoneNumChange = (event) => {
    // console.log(event.target.value)
    setNewPhoneNum(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    // console.log(event.target.value)
    setSearchName(event.target.value)
  }

  let showAllPersons = persons.map(person => <Person key={person.name} person={person} />)
  let searchByName = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  let showSearchReasult = searchByName.map(person => <Person key={person.id} person={person} />) 
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhonenum={newPhonenum} handlePhoneNumChange={handlePhoneNumChange}/>

      <h3>Numbers</h3>
      {searchName === '' ? showAllPersons : showSearchReasult}
    </div>
  )
}

export default App
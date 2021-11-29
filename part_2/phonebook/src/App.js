import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] =  useState([])
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

  useEffect(() => {
    // console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

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
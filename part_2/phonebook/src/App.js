import React, { useState, useEffect} from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] =  useState([])
  const [newName, setNewName] = useState('')
  const [newPhonenum, setNewPhoneNum] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    // console.log('button clicked: ', event.target)

    // *trim() is used to remove spaces from both end of a string, when the new person name has this kind of happening
    const person = persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase())
    if (person){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)
      updatePersonToServer(person)      
    } else {
      addPersonToServer()
    }    
  }

  const addPersonToServer = () => {
    const personObject = {
      name : newName,
      number : newPhonenum,
      id : persons.length + 1,
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        // console.log('what is the data create-function returns :--------', returnedPerson)
        showNotificationMessage(`Added ${newName}`, 'success', 5)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhoneNum('')
      })
  }

  const updatePersonToServer = (person) => {
    const changePerson = { ...person, number: newPhonenum}
    personService
      .update(person.id, changePerson)
      .then(returnedPerson => {
        // console.log('what is the data update-function returns :--------', returnedPerson)
        showNotificationMessage(`The phone number of ${person.name} is changed`, 'success', 5)
        setPersons(persons.map(per => per.id !== person.id ? per : returnedPerson))
        setNewName('')
        setNewPhoneNum('')
      })
  }

  const showNotificationMessage = (message, messageType, timeInSeconds) => {
    setNotificationMessage(message)
    setMessageStyle(messageType)
    setTimeout(() => {
      setNotificationMessage(null)
    }, timeInSeconds*1000)
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

  const deletePersonInfo = id => {
    const person = persons.find(per => per.id === id)
    window.confirm(`Delete ${person.name} ?`)
    personService
      .deleteData(id)
      .then(() => {
        // *response.data returns the empty array back, when I used console to check what response returns from axiox.delete()
        // *then I decided response is useless here, so I use () to instead of it
        // response => {
        // console.log('what is the data deleteData-function returns:--------', response)
        setPersons(persons.filter(per => per.id !== id))
      })
      .catch(error => {
        showNotificationMessage(`Information of ${person.name} has already been removed from the server`, 'error', 5)
        setPersons(persons.filter(per => per.id !== id))
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        // console.log('what is the data getAll-function returns:--------', initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  let showAllPersons = persons.map(person => <Person key={person.name} person={person} deletePerson={() => deletePersonInfo(person.id)}/>)
  let searchByName = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  let showSearchReasult = searchByName.map(person => <Person key={person.id} person={person} deletePerson={() => deletePersonInfo(person.id)}/>) 
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} messageT={messageStyle} />
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhonenum={newPhonenum} handlePhoneNumChange={handlePhoneNumChange}/>

      <h3>Numbers</h3>
      {searchName === '' ? showAllPersons : showSearchReasult}
    </div>
  )
}

export default App
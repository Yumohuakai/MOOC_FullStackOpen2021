import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] =  useState([])
  const [searchName, setSearchName] = useState('')

  const handleSearchNameChange = (event) => {
    // console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const searchResult = countries.filter(country => country.name.common.toLowerCase().includes(searchName.toLowerCase()))
  const showSearchResult = searchResult.map(country => <Country key={country.name.common} country={country} setSearchName={setSearchName}/>) 
  const showOneDetails = searchResult.map(country => <CountryDetails key={country.name.common} country={country} />) 
  
  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log('promise fulfilled')
        // const mydata = response.data
        setCountries(response.data)
      })
  }, [])
  // console.log('render', countries.length, 'countries')

  return (
    <div>
      <h2>Searching for Countries</h2>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      <br/>
      {searchResult.length > 10 
        ? 'Too many matches, specify another filter' 
        : searchResult.length !== 1 
          ? showSearchResult 
          : showOneDetails
      }
    </div>
  )
}

export default App

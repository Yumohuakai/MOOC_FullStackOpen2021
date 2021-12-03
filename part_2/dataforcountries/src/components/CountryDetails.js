import React, {useState, useEffect} from 'react'
import axios from 'axios'
import WeatherInfo from './WeatherInfo'

const CountryDetails = ({country}) => {
  const languages = Object.values(country.languages)
  const api_key =process.env.REACT_APP_API_KEY.slice(1,-2)
  // console.log('**********content of ***********************', api_key)

  const [weather, setWeather] =  useState([])

  useEffect(() => {
    // console.log('effect - for getting weather')
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then(response => {
        // console.log('promise fulfilled - for getting weather')
        setWeather(response.data)
      })
  }, [country.capital, api_key])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <h4>capital {country.capital}</h4>
      <h4>population {country.population}</h4>
      <h3>language(s)</h3>
      <ul>
        {languages.map(language => <li key={language}> {language} </li>)}
      </ul>
      <br/>
      <img className='flag' src={country.flags.png} alt='the flag of this country' />
      {
        ! weather.main
          ? 'weather is not yet loaded......'
          : ! weather.main.temp
            ? 'weather - temperature is not yet loaded......'
            : <WeatherInfo country={country} weather={weather}/>
      }
    </div>      
  )
}

export default CountryDetails
import React from 'react'

const WeatherInfo = ({country, weather}) => {
    // console.log('I got weather info: ----------', weather.weather[0].icon)
    const cityTemp = Math.round(weather.main.temp - 273.15)
    const cityWindSpeed = Math.round(weather.wind.speed)

    const checkWindDirection = (num) => {
        if ((num > 348.75 && num <= 360) || (num >= 0 && num <= 11.25)){
            return 'N' 
        } else if (num <= 33.75)  {
            return 'NNE'
        } else if (num <= 56.25)  {
            return 'NE'
        }else if (num <= 78.75)  {
            return 'ENE'
        }else if (num <= 101.25)  {
            return 'E'
        }else if (num <= 123.75)  {
            return 'ESE'
        }else if (num <= 146.25)  {
            return 'SE'
        }else if (num <= 168.75)  {
            return 'SSE'
        }else if (num <= 191.25)  {
            return 'S'
        }else if (num <= 213.75)  {
            return 'SSW'
        }else if (num <= 236.25)  {
            return 'SW'
        }else if (num <= 258.75)  {
            return 'WSW'
        }else if (num <= 281.25)  {
            return 'W'
        }else if (num <= 303.75)  {
            return 'WNW'
        }else if (num <= 326.25)  {
            return 'NW'
        }else if (num <= 348.75)  {
            return 'NNW'
        }
    }

    const cityWindDirection = checkWindDirection(weather.wind.deg)
    // console.log('THE direction of wind: -----------', cityWindDirection)   
    
    return (
        <div>
        <h3> Weather in {country.capital}</h3>
        <h4>{weather.weather[0].main} </h4>
        <h4>temperature: {cityTemp} Celcius </h4>
        <h4>wind: {cityWindSpeed} m/s  direction {cityWindDirection} </h4>
        </div>      
    )
}

export default WeatherInfo
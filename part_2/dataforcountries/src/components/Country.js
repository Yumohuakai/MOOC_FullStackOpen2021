import React from 'react'

const Country = ({country, setSearchName}) => {
    return (
        <li>
            {country.name.common} &nbsp;
            <button onClick={() => setSearchName(country.name.common)}>
                show
            </button>
        </li>
    )
}

export default Country
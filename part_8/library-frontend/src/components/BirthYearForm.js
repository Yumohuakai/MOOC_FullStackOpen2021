  
import React, { useState }  from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTH_YEAR } from '../queries'
import Select from 'react-select'

const BirthYearForm = ({ options }) => {
  // console.log('BirthYearForm.js ----------options-----', options)

  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [ setBirthYear ] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    
    const name = selectedOption ? selectedOption.value : ''
    setBirthYear({  variables: { name, born } })
    setBorn('')
  }
  
  return (
    <div>
      <h2>Set birth year for the exist author</h2>
      <form onSubmit={submit}>
        <div>
          <Select 
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>          
          <input 
            required 
            placeholder="author birth year" 
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value, 10))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
      
    </div>
  )
}

export default BirthYearForm

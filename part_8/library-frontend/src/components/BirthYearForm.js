  
import React, { useState }  from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTH_YEAR } from '../queries'
import  { useField } from '../customFormHook'
import Select from 'react-select'

const BirthYearForm = ({ options }) => {
  // const newName = useField('text')
  const newBorn = useField('number')
  const removeProp = 'resetValue'
  // const { [removeProp]: resetValueOfNewName, ...restOfNewName} = newName
  const { [removeProp]: resetValueOfNewBorn, ...restOfNewBorn} = newBorn


  // console.log('BirthYearForm.js ----------options-----', options)
  const [selectedOption, setSelectedOption] = useState(null)

  // console.log('BirthYearForm.js ----------selectedOption---and type--', selectedOption, typeof selectedOption)
  // if (selectedOption) {    
  //   console.log('BirthYearForm.js -----not null-----selectedOption---and type--', selectedOption.value, typeof selectedOption.value)
  // }
  const [ setBirthYear ] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    
    const birthyear = parseInt(newBorn.value, 10)
    // const name = newName.value
    const name = selectedOption ? selectedOption.value : ''
    setBirthYear({  variables: { name, birthyear } })

    // resetValueOfNewName()
    resetValueOfNewBorn()
  }
  
  return (
    <div>
      <h2>Set birth year for the exist author</h2>
      <form onSubmit={submit}>
        <div>
          {/* <input autoFocus required placeholder="author name" {...restOfNewName} /> */}
        </div>
        <div>
          <Select 
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>          
          <input required placeholder="author birth year" {...restOfNewBorn} />
        </div>
        <button type='submit'>update author</button>
      </form>
      
    </div>
  )
}

export default BirthYearForm

import React from 'react'
import Input from './Input'

const Filter = ({searchName, handleSearchNameChange}) => {
  return (
    <Input label='filter shown with:: ' value={searchName} onChange={handleSearchNameChange} />
  )
}
export default Filter
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    // console.log('the input type and value-----', event.target.value, typeof event.target.value)
  }

  const resetValue = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetValue
  }
}
  
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'
import AuthorsViewWithoutToken from './AuthorsViewWithoutToken'

const Authors = ({ show, token }) => {
  const options = []
  const result = useQuery(ALL_AUTHORS)  
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  if (authors) {
    authors.map(a =>  options.push({ value: a.name,  label: a.name}))
    // console.log('Author.js ----------options-----', options)
  }
  // console.log('-----Authors---------token--------', token)

  if (!token) {
    return (
      <div>
        <AuthorsViewWithoutToken authors={authors} />
      </div>
    )
  }
  
  return (
    <div>
      <AuthorsViewWithoutToken authors={authors} />
      <BirthYearForm options={options} />
    </div>
  )
}

export default Authors

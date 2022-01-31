  
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'

const Authors = ({ show, token }) => {
  const options = []
  const result = useQuery(ALL_AUTHORS)  

  if (!show) {
    return null
  } else  if (result.loading) {
    return <div>loading...</div>
  } else if (result.data.allAuthors) {
    result.data.allAuthors.map(a =>  options.push({ value: a.name,  label: a.name}))
    // console.log('Author.js ----------options-----', options)
  }
  console.log('-----Authors---------token--------', token)

  if (!token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {result.data.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <BirthYearForm options={options}/>
      </div>
    </div>
  )
}

export default Authors

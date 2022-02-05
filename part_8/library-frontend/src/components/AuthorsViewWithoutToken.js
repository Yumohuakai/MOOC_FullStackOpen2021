  
import React from 'react'

const AuthorsViewWithoutToken = ({ authors }) => (
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
        {authors
          ? authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
            )
          : null
        }
      </tbody>
    </table>
  </div>
)

export default AuthorsViewWithoutToken

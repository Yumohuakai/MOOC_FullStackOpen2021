import React from 'react'

const Recommend = ({ show, favoriteGenre, recBooks }) => {

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{favoriteGenre}</b></p>
      
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {recBooks
              ? recBooks.map(a =>
                    <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                )
              : <tr><td>no data ...</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommend
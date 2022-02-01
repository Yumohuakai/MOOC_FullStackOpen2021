import React from 'react'
import { useState, useEffect }  from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME_INFO } from '../queries'

const Recommend = ({ show }) => {
  const [bookList, setBookList] = useState([])
  const [meInfo, setMeInfo] = useState(null)
  const resultBook = useQuery(ALL_BOOKS)  
  const resultMe = useQuery(ME_INFO)

  useEffect(() => {
    if (resultBook.data && resultMe.data) {
    setBookList(resultBook.data.allBooks)
    setMeInfo(resultMe.data.me)
    }
  }, [resultBook.data, resultMe.data])

  if (!show) {
    return null
  } else if (resultBook.loading && resultMe.loading ) {
    return <div>loading...</div>
  } 



  return (
    <div>
      <h2>recommendations</h2>
      {meInfo
        ? <p>books in your favourite genre <b>{meInfo.favoriteGenre}</b></p>
        : null
      }
      
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
            {bookList
              ? bookList
                .filter(b => b.genres.includes(meInfo.favoriteGenre))
                .map(a =>
                    <tr key={a.title}>
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
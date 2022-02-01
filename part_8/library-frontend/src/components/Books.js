import React from 'react'
import { useState, useEffect }  from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const generateId = () =>
    Math.floor(Math.random() * 100000000)

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  const [genrePrefix, setGenrePrefix] = useState('in ')
  const [bookList, setBookList] = useState([])
  const genreList = []
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBookList(result.data.allBooks)
    }
  }, [result.data])


  const genresFilter = (selectedG) => {
    if (selectedG) {
      // setSelectedGenre('in genre ' + selectedG)
      setGenrePrefix('in genre ')
      setSelectedGenre(selectedG)
      const filterG = result.data.allBooks.filter(b => b.genres.includes(selectedG))
      // console.log('-----Books.js--onclick function -filterG-------', filterG)    
      setBookList(filterG) 
    } else {
      setGenrePrefix('in ')
      setSelectedGenre('all genres')
      setBookList(result.data.allBooks)
    }
     
  } 

  if (!show) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  } 
  
  if (result.data.allBooks) {
    result.data.allBooks.map( b => 
      b.genres.map(g => genreList.includes(g) ? null : genreList.push(g))
    )
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {genrePrefix} <b>{selectedGenre}</b>
      </div>
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
              ? bookList.map(a =>
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
      <div>
        {genreList
          ? genreList.map(g =>
            <button key={generateId()} onClick={() => genresFilter(g)}>{g}</button>
            )
          : null
        }
        <button key={generateId()} onClick={() => genresFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
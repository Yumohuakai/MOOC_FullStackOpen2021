
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('')

  const result_authors = useQuery(ALL_AUTHORS)
  const result_books = useQuery(ALL_BOOKS)


  if (result_authors.loading) {
    return <div>loading...</div>
  }
  if (result_books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors 
        authors = { result_authors.data.allAuthors}
        show={page === 'authors'}
      />

      <Books 
        books = { result_books.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
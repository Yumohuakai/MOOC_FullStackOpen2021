
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend' 
// import Myrec from './components/Myrec' 
import { ALL_BOOKS, BOOK_ADDED, ME_INFO, FIND_BOOK_BY_GENRE } from './queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [notification, setNotification] = useState(null)
  
  const [getRecBooks, result] = useLazyQuery(FIND_BOOK_BY_GENRE) 
  const [recBooks, setRecBooks] = useState([])

  const showRecBooks = (genre) => {
    // console.log('---App.js---showRecBooks()------genre---', genre)
    getRecBooks({ variables: { nameOfGenre: genre } })
    setPage('recommend')
  }

  useEffect(() => {
    if (result.data) {
      setRecBooks(result.data.allBooks)
    }
  }, [result])

  
  const resultMe = useQuery(ME_INFO) 
  const [meInfo, setMeInfo] = useState(null)
  useEffect(() => {
    if (resultMe.data) {
      setMeInfo(resultMe.data.me)
    }
  }, [resultMe])

  const showNotificationMessage = (message, type='success', timeInSeconds=5) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, timeInSeconds*1000)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      showNotificationMessage(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }  
  // console.log('-----App---------token--------', token)
  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>  
          <Notification notification={notification} />
        </div>

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'} />
      <LoginForm show={page === 'login'} setToken={setToken}  setPage={setPage} />
    </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>

        {meInfo 
          ? <button onClick={() => showRecBooks(meInfo.favoriteGenre)}>recommend</button>
          : null
        }
        
        <button onClick={logout}>logout</button>        
        <Notification notification={notification} />
      </div>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook 
        show={page === 'add'} 
        setPage={setPage} 
        setError={showNotificationMessage} 
        updateCacheWith={updateCacheWith}/>
      
      <Recommend 
        show={page === 'recommend'}  
        favoriteGenre={meInfo.favoriteGenre} 
        recBooks={recBooks}/>



    </div>
  )
}

export default App
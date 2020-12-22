
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('library-user-token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [])

  const successfulLogin = (newToken) => {
    setPage('authors')
    setToken(newToken)
  }

  const afterLogout = () => {
    setPage('authors')
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
        <div>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => afterLogout()}>logout</button>
        </div>
        }
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <NewBook
        show={page === 'add'}
      />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />


      <Login
        show={page === 'login'}
        successfulLogin={successfulLogin}
      />  

    </div>
  )
}

export default App

import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const successfulLogin = (newToken) => {
    setPage('authors')
    setToken(newToken)
  }

  const afterLogout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
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
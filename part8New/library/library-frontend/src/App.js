
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const successfulLogin = (newToken) => {
    setPage('authors')
    setToken(newToken)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
        <div>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('logout')}>logout</button>
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
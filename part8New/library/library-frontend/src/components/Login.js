import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../queries'

const Login = (props) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ login, result ] = useMutation(LOGIN_USER, {
    onError: (error) => {
      alert('wrong credentials')
      console.log(error.graphQLErrors[0].message)
    }
  })

  
  useEffect(() => {
    if ( result.data && result.data.login ) {
      const token = result.data.login.value
      localStorage.setItem('library-user-token', token)
      props.successfulLogin(token)
    }
  }, [result.data]) // eslint-disable-line
  
  const submit = async (event) => {
    event.preventDefault()
    
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }
  
  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login
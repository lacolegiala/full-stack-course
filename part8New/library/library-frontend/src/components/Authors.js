  
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import  { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  const [ authorToEdit, setAuthorToEdit ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: authorToEdit, setBornTo: birthYear } })

    setAuthorToEdit('')
    setBirthYear('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      notify('author not found, please check spelling')
    }
  }, [result.data])
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }


  return (
    <div>
      <Notify errorMessage={errorMessage}></Notify>
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
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Edit author's year of born</h2>
      <form onSubmit={submit}>
        <div>
          Author's name:
          <input
            value={authorToEdit}
            onChange={({ target }) => setAuthorToEdit(target.value)}
          />
        </div>
        <div>
          Year of born:
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Set year of birth</button>
      </form>
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default Authors

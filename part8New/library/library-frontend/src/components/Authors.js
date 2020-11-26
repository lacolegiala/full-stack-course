  
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select';

import  { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {
  const [ birthYear, setBirthYear ] = useState('')
  const [ selectedAuthor, setSelectedAuthor ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null)
  
  const authors = useQuery(ALL_AUTHORS)

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedAuthor.value, setBornTo: birthYear } })

    setSelectedAuthor(null)
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

  const authorNames = authors.data.allAuthors.map(function (author) {
    return {
      value: author.name,
      label: author.name
    }
  })
  

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
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorNames}
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

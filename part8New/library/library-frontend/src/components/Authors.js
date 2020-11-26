  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select';

import  { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {
  const [ birthYear, setBirthYear ] = useState('')
  const [ selectedAuthor, setSelectedAuthor ] = useState(null);
  
  const authors = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selectedAuthor.value, setBornTo: birthYear } })

    setSelectedAuthor(null)
    setBirthYear('')
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
            type='number'
            value={birthYear}
            onChange={({ target }) => setBirthYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Set year of birth</button>
      </form>
    </div>
  )
}

export default Authors

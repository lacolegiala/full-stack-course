  
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import  { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  const [ authorToEdit, setAuthorToEdit ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = async (event) =>{
    event.preventDefault()

    editAuthor({ variables: { name: authorToEdit, setBornTo: birthYear } })

    setAuthorToEdit('')
    setBirthYear('')
  }
  
  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

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

export default Authors

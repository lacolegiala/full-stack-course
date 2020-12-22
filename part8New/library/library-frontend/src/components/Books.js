import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import  { ALL_BOOKS } from '../queries'

function makeArrayUnique(array) {
  const uniqueArray = []

  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i])
    }
  }
  return uniqueArray
}

const Books = (props) => {
  const [genre, setGenre] = useState('all books')

  const books = useQuery(ALL_BOOKS)
  const genres = books.data ? makeArrayUnique(books.data.allBooks.flatMap(book =>
    book.genres  
  ))
  : []

  const genresPlusAllBooks = genres.concat('all books')


  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const filteredBooks = genre === 'all books'
    ? books.data.allBooks
    : books.data.allBooks.filter(book =>
      book.genres.includes(genre)  
    )

  return (
    <div>
      <h2>books</h2>
      {genresPlusAllBooks.map(genre => 
        <button
          key={genre}
          onClick={() => setGenre(genre)}
        >{genre}
        </button>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import  { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all books')

  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)

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
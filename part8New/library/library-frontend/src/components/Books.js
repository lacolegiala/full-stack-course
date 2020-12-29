import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import  { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all books')

  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)

  const genresPlusAllBooks = genres.data ? genres.data.allGenres.concat('all books') : []

  useEffect(() => {
    getBooks()
  }, [])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  function filterByGenre(selectedGenre) {
    setGenre(selectedGenre)
    selectedGenre !== 'all books'
      ? getBooks({ variables: { genre: selectedGenre }})
      : getBooks()
  }

  return (
    <div>
      <h2>books</h2>
      {genresPlusAllBooks.map(genre => 
        <button
          key={genre}
          onClick={() => filterByGenre(genre)}
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
          {result.data && result.data.allBooks.map(book =>
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
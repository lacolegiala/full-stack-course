import React from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = (props) => {
  const books = useQuery(FAVORITE_GENRE_BOOKS)
  const currentUser = useQuery(CURRENT_USER)

  const favoriteGenre = currentUser.data
    ? currentUser.data.me.favoriteGenre
    : null

  const recommendedBooks = books.data
   ? books.data.userFavoriteGenreBooks
   : []

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <h3>Books recommended for you according to your favorite genre {favoriteGenre}</h3>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {recommendedBooks.map(book =>
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

export default Recommendations
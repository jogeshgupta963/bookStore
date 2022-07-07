import React, { useEffect } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'
import client from '../graphql/graphql'

const GET_BOOKS = gql`
  query GETBOOKS {
    books {
      id
      name
      genre
      author {
        name
      }
    }
  }
`

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log(data.books)
  return (
    // <ApolloProvider client={client}>
    <div>
      <h1>Book List</h1>
      <div>
        <ul>
          {data.books.map((book) => (
            <li key={book.id}>
              <div>
                <h2>{book.name}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    // </ApolloProvider>
  )
}

export default BookList

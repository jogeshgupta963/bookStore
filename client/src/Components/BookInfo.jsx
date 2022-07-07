import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const GET_BOOK = gql`
  query GETBOOK($bookId: String!) {
    book(id: $bookId) {
      id
      name
      genre
      author {
        name
        books {
          name
          id
        }
      }
    }
  }
`

function BookInfo({ bookId, getBookDetails }) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  })
  if (loading) return null
  if (error) return `Error! ${error}`

  return (
    <div
      style={{
        backgroundColor: 'pink',
        padding: '10px',
        borderRadius: '10px',
        height: '70vh',
      }}
    >
      <h3 className="text-center">{data.book.name}</h3>
      <div>Author :{data.book.author.name}</div>
      <p> Genre : {data.book.genre}</p>
      <p>
        Books by this author:
        <ListGroup>
          {data.book.author.books.map((book) => (
            <ListGroup.Item
              as="button"
              key={book.id}
              style={{
                listStyle: 'circle',
                backgroundColor: 'pink',
                border: 'none',
                textAlign: 'left',
                paddingLeft: '10%',
              }}
              onClick={getBookDetails}
              value={book.id}
            >
              {book.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </p>
    </div>
  )
}

export default BookInfo

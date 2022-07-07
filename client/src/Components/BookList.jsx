import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import BookInfo from './BookInfo'
import CreateBook from './CreateBook'

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
  const [book, setBook] = React.useState('')
  const getBookDetails = (e) => {
    setBook(e.target.value)
  }

  const { loading, error, data } = useQuery(GET_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h1>Book List</h1>

      <Row>
        <Col xs={6}>
          <ListGroup horizontal>
            {data.books.map((book) => (
              <ListGroup.Item
                key={book.id}
                style={{
                  border: 'none',
                }}
              >
                <Button
                  value={book.id}
                  onClick={getBookDetails}
                  variant="success"
                >
                  {' '}
                  {book.name}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Row>
            <CreateBook />
          </Row>
        </Col>
        <Col className="container" md={5}>
          <BookInfo
            bookId={book || data.books[0].id}
            getBookDetails={getBookDetails}
          />
        </Col>
      </Row>
    </div>
  )
}

export default BookList

import React from 'react'
import {
  Container,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap'

import { useQuery, gql, useMutation } from '@apollo/client'
const GET_AUTHORS = gql`
  query GETAUTHORS {
    authors {
      id
      name
    }
  }
`
// Define mutation
const CREATE_BOOK = gql`
  mutation CREATEBOOK($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`

function CreateBook() {
  const [author, setAuthor] = React.useState('')
  const name = React.useRef('')
  const genre = React.useRef('')
  const clickHandle = (e) => {
    e.preventDefault()
    console.log(name.current.value, genre.current.value, author)
    console.log(author)
    createBook({
      variables: {
        name: name.current.value,
        genre: genre.current.value,
        authorId: author,
      },
    })
  }
  const [createBook, mutationData] = useMutation(CREATE_BOOK)
  const { loading, error, data } = useQuery(GET_AUTHORS)
  if (loading || mutationData.loading) return <p>Loading...</p>
  if (error || mutationData.error) return <p>Error :(</p>

  return (
    <Container>
      <h3>Create Book</h3>
      <Form>
        <Form.Group controlId="bookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" ref={name} placeholder="Enter Book Name" />
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            ref={genre}
            placeholder="Enter Book Genre"
          />
          <Form.Label>Author</Form.Label>
          <Form.Select onClick={(e) => setAuthor(e.target.value)}>
            {data.authors.map((author) => (
              <option
                value={author.id}
                key={author.id}
                onClick={(e) => setAuthor(e.target.value)}
              >
                {author.name}
              </option>
            ))}
          </Form.Select>
          <Button className="mt-3" onClick={clickHandle}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default CreateBook

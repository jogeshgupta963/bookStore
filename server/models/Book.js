const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String,
})

bookSchema.set('timestamps', true)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book

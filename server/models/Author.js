const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

authorSchema.set('timestamps', true)

const Author = mongoose.model('Author', authorSchema)
module.exports = Author

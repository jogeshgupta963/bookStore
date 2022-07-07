const graphql = require('graphql')
const lodash = require('lodash')
const Book = require('../models/Book')
const Author = require('../models/Author')

const BookType = new graphql.GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    genre: { type: graphql.GraphQLString },
    author: {
      type: AuthorType,
      resolve: async (parent, args) => {
        return await Author.findById(parent.authorId)
      },
    },
  }),
})

const AuthorType = new graphql.GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
    books: {
      type: new graphql.GraphQLList(BookType),
      resolve: async (parent, args) => {
        return await Book.find({ authorId: parent.id })
      },
    },
  }),
})

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args) => {
        return await Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args) => {
        return await Author.findById(args.id)
      },
    },
    books: {
      type: new graphql.GraphQLList(BookType),
      resolve: async (parent, args) => {
        return await Book.find()
      },
    },
    authors: {
      type: new graphql.GraphQLList(AuthorType),
      resolve: async (parent, args) => {
        return await Author.find()
      },
    },
  },
})

const Mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        age: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: async (parent, args) => {
        let author = await Author.create(args)
        return author
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        genre: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        authorId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      resolve: async (parent, args) => {
        console.log(args)
        let book = await Book.create(args)
        return book
      },
    },
  },
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})

const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { countDocuments } = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let booksToShow = await Book.find({})
      // if (args.author) {
      //   booksToShow = booksToShow.filter(book => book.author === args.author)
      // }
      if (args.genre) {
        booksToShow = booksToShow.filter(book => book.genres.includes(args.genre))
      }
      return booksToShow
    },
    allAuthors: async () => {
      return await Author.find({})
    }
  },
  // Author: {
  //   bookCount: (root) => {
  //     return (Book.find({ author: root })).countDocuments()
  //   }
  // },
  Mutation: {
    addBook: async (root, args) => {
      let book
      if (await Author.where({ name: args.author }).countDocuments() === 0) {
        book = new Book({ ...args, author: new Author({ name: args.author })})
        const author = new Author({ name: args.author })
        author.save()
      }
      else {
        book = new Book({...args})
      }
      return book.save()
    },
    // editAuthor: (root, args) => {
    //   const author = Author.findOne({ name: args.name })
    //   if (!author) {
    //     return null
    //   }
    //   author.born = args.setBornTo

      // const upDatedAuthor = { ...author, born: args.setBornTo }
      // authors = authors.map(author => author.name === args.name ? upDatedAuthor : author)
      // return upDatedAuthor
    //  }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
}) 
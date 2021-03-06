const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

const pubsub = new PubSub()

console.log('connecting to mongo')

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
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String]!
    me: User
    userFavoriteGenreBooks: [Book!]!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
function makeArrayUnique(array) {
  const uniqueArray = []

  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i])
    }
  }
  return uniqueArray
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return await Book.find({ genres: args.genre }).populate('author')
      }
      else {
        return await Book.find({}).populate('author')
      }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    allGenres: async () => {
      const allGenres = (await Book.find({})).flatMap(book =>
        book.genres
      )
      return makeArrayUnique(allGenres)
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    userFavoriteGenreBooks: async (root, args, context) => {
      const favoriteGenre = context.currentUser.favoriteGenre
      return await Book.find({ genres: favoriteGenre }).populate('author')
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let book
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let foundAuthor = await Author.findOne({name: args.author})
      let newAuthor = null
        if (!foundAuthor) {
          newAuthor = new Author({ name: args.author, born: null, bookCount: 1 })
          try {
            await newAuthor.save()
            book = new Book({ ...args, author: newAuthor})
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        }
        else {
          book = new Book({...args, author: foundAuthor})
          foundAuthor = await Author.updateOne({_id: foundAuthor._id}, {$set: {bookCount: foundAuthor.bookCount + 1}})
        }
        if (foundAuthor || newAuthor) {
          try {
            await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book
        }
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre, password: 'passwordthatisthesameforeveryonegg' })
      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return newUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'passwordthatisthesameforeveryonegg') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
}) 
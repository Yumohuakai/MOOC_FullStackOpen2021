const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')

// const { PubSub } = require('graphql-subscriptions')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const author = require('./models/author')

const JWT_SECRET = 'mountains'
const MONGODB_URI = 'mongodb+srv://fullstackyumo:huafazuobinshuang4716@cluster0.chkuj.mongodb.net/library-app?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
mongoose.connect(MONGODB_URI)
   .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// mongoose.set('debug', true)

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    myBooks: [Book!]
    bookCount: Int
    id: ID!
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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      authorName: String!
      authorBorn: Int
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
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

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      } else if (args.author) {        
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return await Book.find({'author': author.id})
        } else {
          return null
        }        
      } else if (args.genre) {
        return await Book.find({'genres': { $in: [ args.genre ] }})
      } 
      return await Book.find({}).populate('author')
    }, 
    allAuthors: async () => {      
      // console.log("Author.find")
      return  await Author.find({}).populate('myBooks')
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return root.myBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let book
      let author
      const existedAuthor = await Author.findOne({ name: args.authorName })      
      if (!existedAuthor) {     
        author = new Author({ name: args.authorName, born: args.authorBorn })  
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        book = new Book({ ...args, author })
      } else {
        book = new Book({ ...args, author: existedAuthor })
      }
      
      try {
          const savedBook = await book.save()
          if (author) {
            author.myBooks.push(savedBook._id)                   
            await author.save()
          } else {
            existedAuthor.myBooks.push(savedBook._id)                   
            await existedAuthor.save()
          }         
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
       
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      } else {
        return null
      }     
    },
    createUser: async (root, args) => {
      // console.log('-----what is input-------args-----', args)
      const user = new User({ ...args })
  
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      // console.log('----index.js---server---what is auth----', auth)

      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      // console.log('----index.js---server---what is decodedToken----', decodedToken)

      const currentUser = await User.findById(decodedToken.id)
      // console.log('---what is currentUser--------', currentUser)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
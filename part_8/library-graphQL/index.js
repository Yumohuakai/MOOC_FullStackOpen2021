const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

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


const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Genre {
    name: String!
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
      authorName: String!
      authorBorn: Int
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
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
        return books.filter(book => book.author === args.author)
      } else if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      } 
      return await Book.find({}).populate('author')
    }, 
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const mybookCount = await Book.find({'author': root.id})
      // console.log('-------------what is mybookCount-------', mybookCount.length)
      return mybookCount.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const existedAuthor = await Author.findOne({ name: args.authorName })
      let book
      if (!existedAuthor) {     
        const author = new Author({ name: args.authorName,  
          born: args.authorBorn })           
        await author.save()
        book = new Book({ ...args, author })
      } else {
        book = new Book({ ...args, author: existedAuthor })
      }
      
      await book.save()
      

      // const currentUser = context.currentUser
  
      // if (!currentUser) {
      //   throw new AuthenticationError("not authenticated")
      // }
  
      // try {
      //   await book.save()
      //   await author.save()
        // currentUser.friends = currentUser.friends.concat(person)
        // await currentUser.save()
      // } catch (error) {
      //   throw new UserInputError(error.message, {
      //     invalidArgs: args,
      //   })
      // }  
      return book
    },

    // addBook: (root, args) => {
    //   let author
    //   if(!authors.find(a => a.name === args.author)) {
    //     author = { name: args.author, id: uuid() }
    //     authors = authors.concat(author)
    //   }
    //   const book = { ...args, id: uuid() }
    //   books = books.concat(book)
    //   return book
    // },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      await author.save()
      return author

      // try {
      //   await author.save()
      // } catch (error) {
      //   throw new UserInputError(error.message, {
      //     invalidArgs: args,
      //   })
      // }
    }

    // editAuthor: (root, args) => {
    //   const author = authors.find(a => a.name === args.name)
    //   if(!author) {
    //     return null
    //   }

    //   const updatedAuthor = { ...author, born: args.setBornTo }
    //   authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
    //   return updatedAuthor
    // }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
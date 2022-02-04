import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres 
    author {
      name
      born
    }
  }
`

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
  }
`

export const ALL_AUTHORS = gql`
  query {
      allAuthors {
        ...AuthorDetails
      }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
      allBooks {
         ...BookDetails
      }
  }  
 ${BOOK_DETAILS}
`

export const FIND_BOOK_BY_GENRE = gql`
  query findBookByGenre($nameOfGenre: String) {
      allBooks(genre: $nameOfGenre) {
        ...BookDetails
      }
  }
 ${BOOK_DETAILS}
`

export const ME_INFO = gql`
    query {
        me {
          username
          favoriteGenre
        }
    }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
      addBook(
        title: $title,
        authorName: $author,
        published: $published,
        genres: $genres
      ) {
          ...BookDetails
        }
  }
 ${BOOK_DETAILS}
`

  export const SET_BIRTH_YEAR = gql`
  mutation setBirthYear($name: String!, $born: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $born
      ) {
        ...AuthorDetails
      }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`
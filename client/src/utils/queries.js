import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
        username
      }
    }
  }
`;

export const QUERY_USERS = gql`
{
    user {
        _id
      username
      email
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
        username
      }
    }
}
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
        username
      }
    }
  }
`;

export const QUERY_BOOK = gql`
  query book($id: ID!) {
    book(_id: $id) {
        _id
        authors
        description
        bookId
        image
        link
        title
        username
    }
  }
`;
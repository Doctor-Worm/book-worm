import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($authors: [String], $description: String, $bookId: String, $image: String, $title: String, $username: String) {
    addBook(authors: $authors, description: $description, bookId: $bookId, image: $image, title: $title, username: $username) {
        _id
        authors
        description
        bookId
        image
        title
        username
      }
    }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($_id: ID!) {
  removeRecipe(_id: $_id) {
    _id
  }
}
`;
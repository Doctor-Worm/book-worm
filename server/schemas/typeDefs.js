const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        title: String
        username: String
        }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        book(_id: ID!): Book
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(bookId: String!, authors: [String], title: String, description: String image: String, username: String): Book
        removeBook(bookId: String!): Book
    }
`;

// export the typeDefs
module.exports = typeDefs;
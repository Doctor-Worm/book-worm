const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          },
        // get all users
        users: async () => {
            return User.find()
                .select('-__V -password')
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
        },
        book: async (parent, { _id }) => {
            return Book.findOne({ _id });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
          addBook: async (parent, { _id, title }, context) => {
            if (context.user) {
              const updatedBooks = await Book.findOneAndUpdate(
                { _id: _id },
                { $push: { savedBooks: { title, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedBooks;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, { _id }, context) => {
            
            if (context.user) {
                const user = context.user;
                
                try {
                    const book = await Book.findById(_id);
                    console.log(book);
                    if (user.username === book.username) {
                        await book.delete();
                        return 'Book successfully deleted!';
                    } else {
                        throw new AuthenticationError('Action not allowed.')
                    }
                } catch(error) {
                    throw new Error(error);
                }
            }
          }
    }
};

module.exports = resolvers;
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
        book: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params);
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
                throw new AuthenticationError('Incorrect email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, user };
        },
          addBook: async (parent, args, context) => {
            if (context.user) {
              console.log({...args});
              console.log(context.user);
              const book = await Book.create({ ...args, username: context.user.username });
              console.log('sandwich');
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
              );

              console.log(book);
              console.log('^this the book');
              return book;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook: async (parent, { _id }, context) => {
            
            if (context.user) {
                const user = context.user;
                
                try {
                    const updatedUser = await User.findById(_id);
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
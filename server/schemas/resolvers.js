const { User } = require("../models");

const resolvers = {
    Query: {
// get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
        },
//  get a user by first name
        user: async(parent, { full_name }) => {
            return User.findOne({ full_name })
            .select('-__v -password')
      }
    },
    Mutation: {
        addUser: async () => {

        },
        login: async () => {
            
        }
    }
  };
  
  module.exports = resolvers;
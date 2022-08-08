const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User } = require("../models");

const resolvers = {
	Query: {
		// get logged in user
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select(
					"-__v -password"
				);

				return userData;
			}

			throw new AuthenticationError("Not logged in");
		},
		// get all users
		users: async () => {
			return User.find().select("-__v -password");
		},
		//  get a user by first name
		user: async (parent, { full_name }) => {
			return User.findOne({ full_name }).select("-__v -password");
		},
	},
	Mutation: {
		// create new account using jwt
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		// login
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect email or password");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect email or password");
			}

			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;

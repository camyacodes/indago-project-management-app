// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
	type User {
		_id: ID
		full_name: String
		email: String
	}
	type Query {
		users: [User]
		user(full_name: String!): User
	}
    type Mutation {
        login(email: String!, password: String!): User
        addUser(full_name: String!, email: String!, password: String!): User
    }
`;

// export the typeDefs
module.exports = typeDefs;

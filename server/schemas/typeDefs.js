// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
	type User {
		_id: ID
		full_name: String
		email: String
        projects: [Project]
	}
    type Auth {
        token: ID!
        user: User
    }
    type Project {
        _id: ID
        title: String
        description: String
        assigned_users: [User]
    }
	type Query {
        me: User
		users: [User]
		user(full_name: String!): User
        projects: [Project]
	}
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(full_name: String!, email: String!, password: String!): Auth
    }
`;

// export the typeDefs
module.exports = typeDefs;

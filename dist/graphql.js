"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const auth_service_1 = require("./auth-service");
const typeDefs = (0, apollo_server_express_1.gql) `
  type User {
    id: ID!
    mobileNumber: String!
    otp: String
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    login(mobileNumber: String!, otp: String!): String
    signup(mobileNumber: String!): Boolean
  }
`;
exports.typeDefs = typeDefs;
const resolvers = {
    Query: {
        users: () => auth_service_1.authService.users,
    },
    Mutation: {
        login: (_, { mobileNumber, otp }) => auth_service_1.authService.login({ mobileNumber, otp }),
        signup: (_, { mobileNumber }) => {
            const isSignUpSuccessful = auth_service_1.authService.signup({ mobileNumber });
            if (isSignUpSuccessful) {
                return mobileNumber;
            }
            throw new Error('Signup failed.'); // Optional error handling if signup fails
        },
    },
};
exports.resolvers = resolvers;

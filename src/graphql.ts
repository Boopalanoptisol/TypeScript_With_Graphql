import { gql } from "apollo-server-express";
import { authService } from "./auth-service";

const typeDefs = gql`
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

const resolvers = {
  Query: {
    users: () => authService.users,
  },
  Mutation: {
    login: (_: any, { mobileNumber, otp }: { mobileNumber: string; otp: string }): string =>
      authService.login({ mobileNumber, otp }),
    signup: (_: any, { mobileNumber }: { mobileNumber: string }): string => {
      const isSignUpSuccessful = authService.signup({ mobileNumber });
      if (isSignUpSuccessful) {
        return mobileNumber;
      }
      throw new Error('Signup failed.'); // Optional error handling if signup fails
    },
  },
};

export { typeDefs, resolvers };

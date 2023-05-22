import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs, resolvers } from './graphql';

const app = express();
const port = 5000;

const server = new ApolloServer({ typeDefs, resolvers });
const startServerAsync = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServerAsync().then(() => {
  app.listen({ port }, () =>
    console.log(`Server running at ${port}`)
  );
});

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "./resolvers";
import { connectDB } from "./mongo/config";

const startServer = async () => {
  await connectDB();

  const app: Application = express();
  const typeDefs = readFileSync(path.join(__dirname, "schema.graphql"), "utf8");

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
};

startServer().catch(console.error);

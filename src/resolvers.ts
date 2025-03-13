import { Resolvers, User } from "./generated/graphql";
import { ObjectId } from "mongodb";
import { getDB } from "./mongo/config";

export const resolvers: Resolvers = {
  Query: {
    getUsers: async (): Promise<User[]> => {
      const users = await getDB().collection("users").find().toArray();

      return users.map((user) => ({
        id: user._id.toString(), // Convert ObjectId to string
        name: user.name,
        email: user.email,
      }));
    },
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const db = getDB();
      const newUser = { _id: new ObjectId(), name, email };
      await db.collection("users").insertOne(newUser);
      return { id: newUser._id.toString(), ...newUser };
    },
  },
};

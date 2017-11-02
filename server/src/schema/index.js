const { makeExecutableSchema } = require('graphql-tools');
import { resolvers } from "../resolvers";

// Define types
const typeDefs = `
  type User {
    id: ID! 
  }

  type Query {
    User(id: ID): User
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
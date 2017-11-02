const { makeExecutableSchema } = require('graphql-tools');
import { resolvers } from "../resolvers";

// Define types
const typeDefs = `
  type Trust {
    id: ID! 
    client: String!
    name: String!
  }

  type Query {
    Trust(id: ID): Trust
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
const { makeExecutableSchema } = require('graphql-tools');
import { resolvers } from "../resolvers";

// Define types
const typeDefs = `
  type Trust {
    id: ID! 
    client: String!
    fiduciary: String!
    name: String!
    requests: [Request]
  }

  type Request {
    id: ID! 
    trustId: ID! 
    title: String!
    description: String!
    state: String!
  }

  type Query {
    Trust(id: ID): Trust
    allTrusts: [Trust]
    Request(id: ID): Request
    allRequests: [Request]
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
import {TrustProtocolJs} from "trust-protocol-js"

import {trustProtocol} from "../utils/trustProtocol.js"

const Query = {
  Trust: async (_, data) => {
    const trust = await trustProtocol.trusts.get(data.id);
    return {id:data.id, ...trust};
  },

  allTrusts: async () => { 
    return await trustProtocol.trusts.getAll();
  }, 

  Request: async (_, data) => {
    const trust = await trustProtocol.requests.get(data.id);
    return {id, ...trust};
  },

  allRequests: async (_, data) => {
    return await trustProtocol.requests.getAll();
  },
};

const resolvers = { Query };

export { resolvers };
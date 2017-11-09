import {TrustProtocolJs} from "trust-protocol-js"

import {trustProtocol} from "../utils/trustProtocol.js"

const Query = {
  Trust: async (_, data) => {
    //TODO: Find way of only loading requests when needed (couldn't find out how to get info on what data is requested here)
    const trust = await trustProtocol.trusts.get(data.id);
    const requests = await trustProtocol.requests.getAll();
    let trustRequests = requests.filter(r => r.trustId === data.id);
    return {id:data.id, ...trust, requests: trustRequests};
  },

  allTrusts: async () => { 
    return await trustProtocol.trusts.getAll();
  }, 

  Request: async (_, data) => {
    const request = await trustProtocol.requests.get(data.id);
    return {id, ...request};
  },

  allRequests: async (_, data) => {
    return await trustProtocol.requests.getAll();
  },
};

const resolvers = { Query };

export { resolvers };
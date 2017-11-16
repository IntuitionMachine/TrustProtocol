import {TrustProtocolJs} from "trust-protocol-js"
import trustProtocol from "../utils/trustProtocol.js"
import Web3 from 'web3';
import * as _ from "lodash";

async function allRequests(){
    const count = await trustProtocol().requests.getCount();
    let requests =  await Promise.all(
        _.range(count).map(i => getRequest(i + 1))
    )
    return requests
}

async function getRequest(id){
  const request = await trustProtocol().requests.get(id);
  let deliveryAttachments = await trustProtocol().requests.getDeliveryAttachments(id);
  let deliveryDescription = await trustProtocol().requests.getDeliveryDescription(id);
  return {...request, deliveryAttachments, deliveryDescription: _.last(deliveryDescription)};
}

async function getTrust(id){
    const trust = await trustProtocol().trusts.get(id);
    const requests = await allRequests();
    let trustRequests = requests.filter(r => r.trustId === id);
    return {...trust, requests: trustRequests};
}

async function getTrusts(){
    const count = await trustProtocol().trusts.getCount();
    let requests =  await Promise.all(
        _.range(count).map(i => getTrust(i + 1))
    )
    return requests
}

const Query = {
  Trust: async (_, data) => {
    return getTrust(data.id)
  },

  allTrusts: async () => { 
    return getTrusts()
  }, 

  Request: async (_, data) => {
    return getRequest(data.id)
  },

  allRequests: async (x, data) => {
    return allRequests();
  },
};

const resolvers = { Query };

export { resolvers };
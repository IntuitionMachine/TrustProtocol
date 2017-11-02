import {getTrust} from "./trusts.js"

const Query = {
  Trust: (_, data) => {
    return getTrust(data.id);
  } 
};

const resolvers = { Query };

export { resolvers };
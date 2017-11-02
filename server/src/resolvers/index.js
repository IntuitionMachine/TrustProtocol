import {getTrust, getAllTrusts} from "./trusts.js"

const Query = {
  Trust: (_, data) => {
    return getTrust(data.id);
  } ,
  allTrusts: () => {
    return getAllTrusts();
  } 
};

const resolvers = { Query };

export { resolvers };
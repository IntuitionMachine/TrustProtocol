import Web3 from 'web3';
import * as _Marketplace from "./contracts/Marketplace.json";
export const foo = _Marketplace["abi"];
console.log("HERE", foo)
// import _Trusts from "../contracts/Trusts.json";
// import _Requests from "../contracts/Requests.json";

// import ethUtil from "ethereumjs-util";
// import * as Promise from "es6-promise";

const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io:dYWKKqsJkbv9cZlQFEpI")
const web3 = new Web3(provider)

const promisify = (inner: any) =>
  new Promise((resolve:any, reject:any) =>
    inner((err:any, res:any) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

export class Marketplace {
    constructor(){
        this.abi = _Marketplace["abi"];
        this.location = "0xfa4f59b6c6a68ee59128bd5ae974fdbb080ad5c0";
        this.contract = new web3.eth.Contract(this.abi, this.location)
    }

    async owner(){
        return await promisify(this.contract.methods.owner().call);
    }

    async trusts(){
        const address = await promisify(this.contract.methods.trusts().call);
        // return new Trusts(address);
    }
}

// export class Trusts {
//     constructor(location){
//         this.abi = _Trusts["abi"];
//         this.location = location;
//         this.contract = new web3.eth.Contract(this.abi, this.location)
//     }

//     _format(trust) {
//         return {client: trust[0], name: web3.utils.hexToAscii(trust[1])} 
//     }

//     async get(params){
//         const item = await promisify(this.contract.methods.get(params).call);
//         return this._format(item);
//     }

//     async getCount(){
//         return await promisify(this.contract.methods.getCount().call);
//     }

//     async getAll(){
//         const count = await this.getCount();
//         return await Promise.all(
//             _.range(count).map(i => this.get(i))
//         )
//     }
// }
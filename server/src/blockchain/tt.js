import _ from "lodash";

const Web3 = require('web3');
const _Trusts = require("../contracts/trusts.json");
const _Marketplace = require("../contracts/marketplace.json");
const ethUtil = require("ethereumjs-util");
const secretKey = process.env.SECRET_KEY;
const contractAddress = process.env.TRUST_CONTRACT_ADDRESS;
const providerUrl = process.env.PROVIDER_URL;
const Promise = require("es6-promise").Promise

const provider = new Web3.providers.HttpProvider(providerUrl)

const web3 = new Web3(provider)
const account = web3.eth.accounts.wallet.add(secretKey)
// const abi = _Trusts
// const contract = new web3.eth.Contract(abi, "0x23aa01373cdb1c46992229bde6d6cc9549f3da21")

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

export class Marketplace {
    constructor(){
        this.abi = _Marketplace;
        this.location = "0xfa4f59b6c6a68ee59128bd5ae974fdbb080ad5c0";
        this.contract = new web3.eth.Contract(this.abi, this.location)
    }

    async owner(){
        return await promisify(this.contract.methods.owner().call);
    }

    async trusts(){
        const address = await promisify(this.contract.methods.trusts().call);
        return new Trusts(address);
    }
}

export class Trusts {
    constructor(location){
        this.abi = _Trusts;
        this.location = location;
        this.contract = new web3.eth.Contract(this.abi, this.location)
    }

    _format(trust) {
        return {client: trust[0], name: web3.utils.hexToAscii(trust[1])} 
    }

    async get(params){
        const item = await promisify(this.contract.methods.get(params).call);
        return this._format(item);
    }

    async getCount(){
        return await promisify(this.contract.methods.getCount().call);
    }

    async getAll(){
        const count = await this.getCount();
        return await Promise.all(
            _.range(count).map(i => promisify(this.contract.methods.get(i).call))
        )
    }
}
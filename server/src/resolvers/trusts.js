import {Marketplace} from "../blockchain/tt"

const Web3 = require('web3');
const _Trusts = require("../contracts/trusts.json");

const ethUtil = require("ethereumjs-util");
const secretKey = process.env.SECRET_KEY;
const contractAddress = process.env.TRUST_CONTRACT_ADDRESS;
const providerUrl = process.env.PROVIDER_URL;
const Promise = require("es6-promise").Promise

const provider = new Web3.providers.HttpProvider(providerUrl)

const web3 = new Web3(provider)
const account = web3.eth.accounts.wallet.add(secretKey)
const abi = _Trusts
const contract = new web3.eth.Contract(abi, "0x23aa01373cdb1c46992229bde6d6cc9549f3da21")

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

export async function getTrust(id) {
    const marketplace = new Marketplace()
    const trusts = await marketplace.trusts();
    const trust = await trusts.get(id);
    return {id, ...trust};
}
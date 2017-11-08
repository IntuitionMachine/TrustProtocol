// import Web3 from 'web3';
import * as _DB from "./contracts/DB.json";
import * as _ from "lodash";

export class TrustProtocolJs {
    params: {web3: any, userId: any};
    abi: any;
    location: string;
    contract: any;
    trusts: any;
    requests: any;

    constructor(params){
        this.params = params;
        this.abi = _DB["abi"];
        this.location = "0xbbbdad4b8cecbe90aed7c30e17796f23c95fc6d8";
        this.contract = new this.params.web3.eth.Contract(this.abi, this.location)
        this.trusts = new Trusts(this);
        this.requests = new Requests(this);
        return this;
    }
}

const promisify = (inner: any, args: any) =>
  new Promise((resolve:any, reject:any) =>
    inner(args, (err:any, res:any) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

export class Trusts {
    Db: any;

    constructor(db){
        this.Db = db;
    }

    _format(trust:any) {
        return {
            client: trust[0],
            trustee: trust[1],
            name: this.Db.params.web3.utils.hexToAscii(trust[2])
        } 
    }

    async getCount(){
        debugger;
        const count = await promisify(this.Db.contract.methods.getTrustCount().call, {});
        console.log("HI", count);
        return count
    }

    async get(id){
        const trust = await promisify(this.Db.contract.methods.getTrust(id).call, {});
        return this._format(trust);
    }

    async getAll(){
        const count: any = await this.getCount();
        return await Promise.all(
            _.range(count).map(i => this.get(i))
        )
    }

    async create(client, trustee, name){
        const utils = this.Db.params.web3.utils;
        const foo = this.Db.contract.methods.addTrust(client, trustee, utils.asciiToHex(name)).send({from: this.Db.params.userId});
    }
}

export class Requests {
    Db: any;

    constructor(db){
        this.Db = db;
    }

    _format(_request:any) {
        return {
            trustId: _request[0],
            title: this.Db.params.web3.utils.hexToAscii(_request[1]),
            description: this.Db.params.web3.utils.hexToAscii(_request[2]),
            state: _request[3],
        } 
    }

    async get(id){
        const _request = await promisify(this.Db.contract.methods.getRequest(id).call, {});
        return this._format(_request);
    }

    async getCount(){
        return await promisify(this.Db.contract.methods.getRequestCount().call, {});
    }

    async getAll(id){
        const count: any = await this.getCount();
        return await Promise.all(
            _.range(count).map(i => this.get(i))
        )
    }

    async create(trustId, title, description){
        const utils = this.Db.params.web3.utils;
        return await promisify(this.Db.contract.methods.addRequest(trustId, utils.asciiToHex(title), utils.asciiToHex(description)).send, {from: this.Db.params.userId});
    }

    async accept(){
        return await promisify(this.Db.contract.methods.acceptRequest().send, {from: this.Db.params.userId});
    }

    async deliver(){
        return await promisify(this.Db.contract.methods.deliverRequest().send, {from: this.Db.params.userId});
    }
}
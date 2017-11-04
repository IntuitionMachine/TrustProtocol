// import Web3 from 'web3';
import * as _DB from "./contracts/DB.json";
import * as _ from "lodash";

const promisify = (inner: any, args: any) =>
  new Promise((resolve:any, reject:any) =>
    inner(args, (err:any, res:any) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

export class Trusts {
    Db: any;

    constructor(params){
        this.Db = Db;
    }

    _format(trust:any) {
        return {
            client: trust[0],
            trustee: trust[1],
            name: this.Db.params.web3.utils.hexToAscii(trust[2])
        } 
    }

    async getCount(){
        return await promisify(this.Db.contract.methods.getTrustCount().call, {});
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
        return await promisify(this.Db.contract.methods.addTrust(client, trustee, name).send, {from: this.Db.params.userId});
    }
}

export class Requests {
    Db: any;

    constructor(params){
        this.Db = Db;
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
            _.range(count).map(i => this.Db.getTrust(i))
        )
    }

    async create(trustId, title, description){
        return await promisify(this.Db.contract.methods.addRequest(trustId, title, description).send, {from: this.Db.params.userId});
    }

    async accept(){
        return await promisify(this.Db.contract.methods.acceptRequest().send, {from: this.Db.params.userId});
    }

    async deliver(){
        return await promisify(this.Db.contract.methods.deliverRequest().send, {from: this.Db.params.userId});
    }
}

export class Db {
    params: {web3: any, userId: any};
    abi: any;
    location: string;
    contract: any;
    trusts: any;
    requests: any;

    constructor(params){
        this.params = params;
        this.abi = _DB["abi"];
        this.location = "0xfa4f59b6c6a68ee59128bd5ae974fdbb080ad5c0";
        this.contract = new this.params.web3.eth.Contract(this.abi, this.location)
        this.trusts = new Trusts(this);
        this.requests = new Requests(this);
        return this;
    }
}
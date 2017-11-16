// import Web3 from 'web3';
import * as _DB from "./contracts/DB.json";
import * as _ from "lodash";
import * as bs58 from 'bs58';
import {Buffer} from "buffer";

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
        //ropsten
        // this.location = "0x6db6a3f8ab7bab4d5062c4794f966cecb70b15a6";

        //testrpc
        this.location ="0x5fd36b591cc3a83e319615d3817db34130b1d0b3";

        this.contract = new this.params.web3.eth.Contract(this.abi, this.location);
        this.trusts = new Trusts(this);
        this.requests = new Requests(this);
        return this;
    }
}

const promisify = (inner: any, args: any) =>
  new Promise((resolve:any, reject:any) =>
    inner(...args, (err:any, res:any) => {
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
            id: trust[0],
            client: trust[1],
            fiduciary: trust[2],
            name: this.Db.params.web3.utils.hexToAscii(trust[3])
        } 
    }

    async getCount(){
        const count = await promisify(this.Db.contract.methods.getTrustCount().call, [{}]);
        return count
    }

    async get(id){
        const trust = await promisify(this.Db.contract.methods.getTrust(id).call, [{}]);
        return this._format(trust);
    }

    async getAll(){
        const count: any = await this.getCount();
        _.range(count).map(i => {console.log("getting", i, count)})
        return await Promise.all(
            _.range(count).map(i => this.get(i + 1))
        )
    }

    async create(client, fiduciary, name){
        const utils = this.Db.params.web3.utils;
        const created = this.Db.contract.methods.addTrust(client, fiduciary, utils.asciiToHex(name)).send({from: this.Db.params.userId});
    }
}

export class Requests {
    Db: any;

    constructor(db){
        this.Db = db;
    }

    _format(_request:any) {
        return {
            id: _request[0],
            trustId: _request[1],
            title: this.Db.params.web3.utils.hexToAscii(_request[2]),
            description: this.Db.params.web3.utils.hexToAscii(_request[3]),
            state: {
                "0": "REQUESTED",
                "1": "ACCEPTED",
                "2": "DELIVERED",
                "3": "REJECTED"
            }[_request[4]],
        } 
    }

    async get(id){
        const _request = await promisify(this.Db.contract.methods.getRequest(id).call, [{}]);
        return this._format(_request);
    }

    async getCount(){
        return await promisify(this.Db.contract.methods.getRequestCount().call, [{}]);
    }

    async getAll(){
        const count: any = await this.getCount();
        return await Promise.all(
            _.range(count).map(i => this.get(i + 1))
        )
    }

    async create(trustId, title, description){
        const utils = this.Db.params.web3.utils;
        return await promisify(this.Db.contract.methods.addRequest(trustId, utils.asciiToHex(title), utils.asciiToHex(description)).send, [{from: this.Db.params.userId}]);
    }

    async accept(requestId){
        return await promisify(this.Db.contract.methods.acceptRequest(requestId).send, [{from: this.Db.params.userId}]);
    }

    async deliver(requestId){
        return await promisify(this.Db.contract.methods.deliverRequest(requestId).send, [{from: this.Db.params.userId}]);
    }

    async requestDeliveryAttachment(requestId, documentHash){
        const utils = this.Db.params.web3.utils;
        return await promisify(this.Db.contract.methods.requestDeliveryAttachment(requestId, ipfsHashToBytes32(documentHash)).send, [{from: this.Db.params.userId}]);
    }

    async requestDeliveryDescription(requestId, description){
        const utils = this.Db.params.web3.utils;
        return await promisify(this.Db.contract.methods.requestDeliveryDescription(requestId, ipfsHashToBytes32(description)).send, [{from: this.Db.params.userId}]);
    }

    async getPastEvents(requestId, name){
        return await this.Db.contract.getPastEvents(name, {
            filter: {requestId},
            fromBlock: 0,
            toBlock: 'latest'
        })
    }

    async getDeliveryAttachments(requestId){
        const utils = this.Db.params.web3.utils;
        const events = await this.getPastEvents(requestId, 'RegisterDeliveryAttachment');
        return events.map(r => {
            return bytes32ToIPFSHash(r.returnValues.proof)
        })
    }

    async getDeliveryDescription(requestId){
        const utils = this.Db.params.web3.utils;
        const events = await this.getPastEvents(requestId, 'RegisterDeliveryDescription');
        return events.map(r => bytes32ToIPFSHash(r.returnValues.description))
    }
}

function ipfsHashToBytes32(ipfs_hash) {
    var h = bs58.decode(ipfs_hash).toString('hex').replace(/^1220/, '');
    if (h.length != 64) {
        console.log('invalid ipfs format', ipfs_hash, h);
        return null;
    }
    return '0x' + h;
}

function bytes32ToIPFSHash(hash_hex) {
    var buf = new Buffer(hash_hex.replace(/^0x/, '1220'), 'hex')
    return bs58.encode(buf)
}

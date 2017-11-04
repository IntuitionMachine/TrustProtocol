// import Web3 from 'web3';
import * as _DB from "./contracts/DB.json";
import * as _ from "lodash";

const bar = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "client",
          "type": "address"
        },
        {
          "name": "trustee",
          "type": "address"
        },
        {
          "name": "name",
          "type": "bytes32"
        }
      ],
      "name": "addTrust",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "deliverRequest",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getRequestCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "acceptRequest",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "trustIndex",
          "type": "uint256"
        },
        {
          "name": "title",
          "type": "bytes32"
        },
        {
          "name": "description",
          "type": "bytes32"
        }
      ],
      "name": "addRequest",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "trusts",
      "outputs": [
        {
          "name": "client",
          "type": "address"
        },
        {
          "name": "trustee",
          "type": "address"
        },
        {
          "name": "name",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "requests",
      "outputs": [
        {
          "name": "trustId",
          "type": "uint256"
        },
        {
          "name": "title",
          "type": "bytes32"
        },
        {
          "name": "description",
          "type": "bytes32"
        },
        {
          "name": "state",
          "type": "uint8"
        },
        {
          "name": "db",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_i",
          "type": "uint256"
        }
      ],
      "name": "getRequest",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getTrust",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTrustCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }
  ]

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
        console.log(this.abi)
        this.location = "0xbbbdad4b8cecbe90aed7c30e17796f23c95fc6d8";
        this.contract = new this.params.web3.eth.Contract(bar, this.location)
        debugger;
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
        return await promisify(this.Db.contract.methods.addTrust(client, trustee, name).send, {from: this.Db.params.userId});
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
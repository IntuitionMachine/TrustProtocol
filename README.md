# TrustProtocol
## Introduction
The TrustProtocol defines and rewards trustworthy behavior, and penalizes
and mitigates untrustworthy behavior. The TrustProtocol leverages real-world
incentive systems, offering the ability to bring civil and criminal charges against
defecting fiduciaries.

We expect there to be multiple consumer-facing applications built on the
TrustProtocol. These can include web interfaces for consumers to create SmartTrusts,
sector-specific tokenization products (real estate tokenization, currency tokenization,
etc), and more.

The TrustProtocol outlines the processes for marketplace participants to
engage in the creation, actions, and mediation of smart legal contracts. It also
includes specification for how to store and access legal document information
through the TrustVaults.

The TrustProtocol will live on top of a storage layer and underneath a client
layer. The Protocol will run in a smart contract on the Ethereum blockchain and will store most documents on the Interplanetary File System (IPFS).

Marketplace listings will be stored on the blockchain, but will link to public
images on IPFS. The Request System will store logs of all request transactions
on the blockchain. Proof-of-Fulfillment information (such as communication logs
between Clients and Fiduciaries, receipts, and title deeds) will be encrypted and
stored on IPFS.

## /truffle
The truffle directory contains a truffle project with all relevant ethereum contracts and deployment scripts.
```
truffle compile
truffle migrate
```

## /trust_protocol_js
TrustProtocolJS is a library that uses web3 to interact with the TrustProtocol contracts on the block chain.
```
npm install
npm run build:w
```

## /server
The server uses TrustProtocolJS to interact with the TrustProtocol contracts. It exposes a graphQL endpoint for easy querying.
```
npm install
npm run start
```

**Necessary environment variables** .

PROVIDER_URL: Ethereum provider, i.e "https://mainnet.infura.io:XYZ"  
SECRET_KEY: Secret key of the ethereum address to mint coins from  
PORT: Port for server to run on, i.e "8080"  

## /client
The client helps users interact with the TrustProtocol contracts. Querying is done using the server, and mutations are done directly with web3 and TrustProtocolJS.
```
npm install
REACT_APP_SERVER_URL="http://localhost:8080/graphql" npm run start
```

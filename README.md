# TrustProtocol
The TrustProtocol system incorporates several projects to allow people to interact with smart contracts in order to manage smart trusts. As these get larger, they may be broken up into separate repos.

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
TRUST_CONTRACT_ADDRESS: Ethereum coin contract address for a specific trust in question   
SECRET_KEY: Secret key of the ethereum address to mint coins from  
PORT: Port for server to run on, i.e "8080"  

## /client
The client helps users interact with the TrustProtocol contracts. Querying is done using the server, and mutations are done directly with web3 and TrustProtocolJS.
```
npm install
REACT_APP_SERVER_URL="http://localhost:8080/graphql" npm run start
```

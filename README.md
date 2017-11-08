# TrustProtocol
The TrustProtocol system incorporates several projects to allow people to interact with smart contracts in order to manage smart trusts. As these get larger, they may be broken up into separate repos.

## Truffle
The truffle directory contains a truffle project with all relevant ethereum contracts and deployment scripts.

## trust_protocol_js
TrustProtocolJS is a library that uses web3 to interact with the TrustProtocol contracts on the block chain.

## Server
The server uses TrustProtocolJS to interact with the TrustProtocol contracts. It exposes a graphQL endpoint for easy querying.

## Client
The client helps users interact with the TrustProtocol contracts. Querying is done using the server, and mutations are done directly with web3 and TrustProtocolJS.


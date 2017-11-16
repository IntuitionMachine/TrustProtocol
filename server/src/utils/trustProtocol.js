import { TrustProtocolJs } from "trust-protocol-js"

import Web3 from 'web3';

function trustProtocol() {
    const secretKey = process.env.SECRET_KEY;
    const providerUrl = process.env.PROVIDER_URL;

    const provider = new Web3.providers.HttpProvider(providerUrl)

    const web3 = new Web3(provider)

    const account = web3.eth.accounts.wallet.add(secretKey)
    return new TrustProtocolJs({ web3, userId: account });
}

export default trustProtocol;
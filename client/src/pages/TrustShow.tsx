import * as React from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {Marketplace} from "trust-protocol-js";
import getWeb3 from "../utils/getWeb3";

async function foo(web3){
    const mm = new Marketplace(web3);
    setTimeout(() => {
        console.log("hi");
        console.log(mm.owner)
        mm.owner().then(e => {console.log(e)})
    }, 1000)
    
}

getWeb3
.then( web3 => {
    foo(web3.web3)
})

const _TrustShow = (props: any) => {
    const _trusts = props.trusts.allTrusts;
    return (
        <div>
            hi there
            {_trusts && _trusts.map((r: any, i: any) => (
                <div key={i}>{r.name} {r.client}</div>
            ))}
        </div>
    )
}

const TRUSTS_QUERY = gql`
query{
  allTrusts{
    name
    client
  }
}
`;

export const TrustShow = compose(
    graphql(TRUSTS_QUERY, { name: "trusts" }),
)(_TrustShow)
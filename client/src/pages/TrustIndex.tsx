import * as React from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const _TrustIndex = (props: any) => {
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

export const TrustIndex = compose(
    graphql(TRUSTS_QUERY, { name: "trusts" }),
)(_TrustIndex)
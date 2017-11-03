import * as React from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {Marketplace} from "trust-protocol-js";

class _TrustShow extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.createRequest = this.createRequest.bind(this);
    }
    async createRequest(){
      console.log("HI", this.props.web3Params);
      const m = new Marketplace(this.props.web3Params);
      const trusts = await m.trusts()
      const list = await trusts.getAll()
      console.log('YO', list);
    }
    public render() {
        return (
            <div>
                {this.props.trust.Trust &&
                    <div>
                        {this.props.trust.Trust.name}
                        {this.props.trust.Trust.client}
                    </div>
                }
                <div onClick={this.createRequest}>
                    hiii
                </div>
            </div>
        )
    }
}

const TRUSTS_QUERY = gql`
    query Trust($id: ID!){
    Trust(id: $id){
        name
        client
    }
    }
`;

export const TrustShow = compose(
    (Component) => (props) => {
        const EnhancedComponent = graphql(TRUSTS_QUERY, {
            name: "trust",
            options: {
                variables: {
                    id: props.match.params.id,
                },
            },
        })(Component);
        return <EnhancedComponent {...props} />;
    },
)(_TrustShow)
import * as React from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const _TrustShow = (props: any) => {
    return (
        <div>
            {props.trust.Trust &&
                <div>
                    {props.trust.Trust.name}
                    {props.trust.Trust.client}
                </div>
            }
        </div>
    )
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
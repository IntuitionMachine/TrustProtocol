import * as React from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { TrustProtocolJs } from "trust-protocol-js"
import { Row, Column, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

const FieldGroup: any = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
    </FormGroup>
);

class _TrustShow extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.createRequest = this.createRequest.bind(this);
    }
    async createRequest() {
        const trustProtocol = new TrustProtocolJs(this.props.web3Params);
        const form: any = this.refs.form;
        const title = form.getElementsByTagName("input")[0].value;
        const description = form.getElementsByTagName("input")[1].value;
        const request = await trustProtocol.requests.create(this.props.match.params.id, title, description);
    }
    public render() {
        console.log(this.props.trust.Trust)
        return (
            <div>
                {this.props.trust.Trust &&
                    <div>
                        {this.props.trust.Trust.name}
                        {this.props.trust.Trust.client}
                    </div>
                }
                <div ref="form">
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Title"
                        placeholder="Enter text"
                    />
                    <FieldGroup
                        id="trustee"
                        type="text"
                        label="Description"
                        placeholder="Enter text"
                    />
                    <Button type="submit" onClick={this.createRequest} >
                        Submit
                    </Button>
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
        trustee
        requests{
          title
          description
          state
        }
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
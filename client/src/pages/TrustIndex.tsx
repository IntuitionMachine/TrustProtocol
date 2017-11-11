import * as React from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {TrustProtocolJs} from "trust-protocol-js"
import {Row, Column, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";

const FieldGroup: any = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
);

class _TrustIndex extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.createRequest = this.createRequest.bind(this);
    }
    async createRequest(){
        const that = this;
        const trustProtocol = new TrustProtocolJs(this.props.web3Params);
        const form:any = this.refs.form;
        const client = form.getElementsByTagName("input")[0].value;
        const fiduciary = form.getElementsByTagName("input")[1].value;
        const name = form.getElementsByTagName("input")[2].value;
        const trust = await trustProtocol.trusts.create(client, fiduciary, name)
    }
    public render() {
        const _trusts = this.props.trusts.allTrusts;
        return (
            <div>
                {_trusts && _trusts.map((r: any, i: any) => (
                    <div key={i}>name: {r.name} client: {r.client} fiduciary: {r.fiduciary} </div>
                ))}
                <div onClick={this.createRequest}>
                    hiii
                </div>
                <div ref="form">
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Client Address"
                        placeholder="Enter text"
                    />
                    <FieldGroup
                        id="fiduciary"
                        type="text"
                        label="fiduciary Address"
                        placeholder="Enter text"
                    />
                    <FieldGroup
                        id="name"
                        type="text"
                        label="Name"
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
query{
  allTrusts{
    id
    name
    client
    fiduciary
  }
}
`;

export const TrustIndex = compose(
    graphql(TRUSTS_QUERY, { name: "trusts" }),
)(_TrustIndex)
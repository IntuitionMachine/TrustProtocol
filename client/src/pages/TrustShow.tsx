import * as React from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { TrustProtocolJs } from "trust-protocol-js"
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import styled from "styled-components"

const FieldGroup: any = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
    </FormGroup>
);

const Request = styled.div`
  background: #ddd;
  padding: .5em 1em 1em 1em;
  margin-bottom: 1em;
`

class Form extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.createRequest = this.createRequest.bind(this);
        this.hide = this.hide.bind(this);
    }
    async createRequest() {
        const form: any = this.refs.form;
        const title = form.getElementsByTagName("input")[0].value;
        const description = form.getElementsByTagName("input")[1].value;
        this.props.createRequest(title, description)
    }
    public hide() {
        this.props.onHide()
    }
    public render() {
        return(
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
        <Button onClick={this.hide} >
           Hide 
        </Button>
    </div>
        )
    }
}

class _TrustShow extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { showForm: false }
        this.createRequest = this.createRequest.bind(this);
    }

    public createRequest(title, description){
        const trustProtocol = new TrustProtocolJs(this.props.web3Params);
        trustProtocol.requests.create(this.props.match.params.id, title, description)
    }

    public render() {
        return (
            <div>
                {this.props.trust.Trust &&
                    <div>
                        <h2>{this.props.trust.Trust.name}</h2>
                        <strong>{`client: ${this.props.trust.Trust.client}`}</strong>
                        <br />
                        <strong>{`fiduciary: ${this.props.trust.Trust.trustee}`}</strong>
                        <h3>Requests </h3>
                        {this.props.trust.Trust.requests.map(request =>
                            <Row>
                                <Col xs={8}>
                                    <Request>
                                        <h3>{request.title}</h3>
                                        <p>{request.description}</p>
                                    </Request>
                                </Col>
                                <Col xs={4}>
                                    <p>{request.state}</p>
                                </Col>
                            </Row>
                        )
                        }
                    </div>
                }
                {this.state.showForm &&
                    <Form createRequest={this.createRequest} onHide={() => {this.setState({showForm:false})}}/>
                }
                {!this.state.showForm &&
                    <Button onClick={() => {this.setState({showForm:true})}} >
                       Show Form 
                    </Button>
                }
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
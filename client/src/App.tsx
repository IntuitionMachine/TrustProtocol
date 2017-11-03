import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createStore, combineReducers } from "redux";
import {TrustIndex} from "./pages/TrustIndex";
import {TrustShow} from "./pages/TrustShow";
import getWeb3 from "./utils/getWeb3";

import {Marketplace} from "trust-protocol-js";

const networkInterface = createNetworkInterface({ uri: process.env.REACT_APP_SERVER_URL });
const reduxDevtoolsMiddleware =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o: { id: string }) => o.id,
});

const store = createStore(
  combineReducers({}),
  reduxDevtoolsMiddleware
);

//todo: This allProps use is a hack instead of typing <TrustShow {...props} web3={web3}/>.
//Fix to work with typescript.
const Routes = ({web3Params}) => (
  <div>
    <Route path="/trusts/:id" render={props => (<TrustShow {...{web3Params, ...props}} />)}/>
    <Route exact={true} path="/" render={props => (<TrustIndex {...{web3Params, ...props}} />)}/>
  </div>
);

class App extends React.Component<any, any> {
  constructor(props){
    super(props)
    this.state = {
      web3Params: {web3: null, user: null}
    }
  }
  componentWillMount(){
    getWeb3.then(({web3}) => {
      this.setState({web3})
      web3.eth.getAccounts((e, accounts) => {
        this.setState({web3Params: {web3, user: accounts[0]}})
      })
    })
  }
  public render() {
    return (
      <ApolloProvider store={store} client={client}>
        <BrowserRouter>
          <Routes web3Params={this.state.web3Params}/>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export { App };

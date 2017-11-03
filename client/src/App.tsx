import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createStore, combineReducers } from "redux";
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

const Routes = ({web3}) => (
  <div>
    <Route exact={true} path="/" render={props => {
      const allProps = {web3, ...props}
      //todo: This allProps use is a hack instead of typing <TrustShow {...Props} web3={web3}/>.
      //Fix to work with typescript.
      return (<TrustShow {...allProps} />)
      }
    } />
  </div>
);

class App extends React.Component<any, any> {
  constructor(props){
    super(props)
    this.state = {
      web3: null
    }
  }
  componentWillMount(){
    getWeb3.then(results => {
      this.setState({web3: results.web3})
      const marketplace = new Marketplace(results.web3)
      marketplace.trusts()
      .then(t => {
        return t.getAll()
      })
      .then(b => {
        console.log('bbb', b)
      })
    })
  }
  public render() {
    return (
      <ApolloProvider store={store} client={client}>
        <BrowserRouter>
          <Routes web3={this.state.web3}/>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export { App };

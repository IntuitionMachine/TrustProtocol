import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createStore, combineReducers } from "redux";
import {TrustShow} from "./pages/TrustShow";

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

const Routes = () => (
  <div>
    <Route exact={true} path="/" component={TrustShow} />
  </div>
);

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider store={store} client={client}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export { App };

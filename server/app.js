import 'babel-polyfill';

const express = require('express');

// This package automatically parses JSON requests.
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
var cors = require('cors');
const schema = require('./src/schema');
var app = express();

console.log(1)
app.use(cors())
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
console.log(2)

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
console.log(4)

app.listen(process.env.PORT, () => {});
console.log(5)

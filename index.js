const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const config = require('config');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typedefs');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
});

mongoose
    .connect(config.get('MONGO_CONNECTION_STRING'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((res) => {
        console.log('Connected to MongoDb');
    });

server.listen({ port: 5000 }).then((res) => {
    console.log(`Sever is running at ${res.url}`);
});

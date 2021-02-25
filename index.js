const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('config');

const { resolvers, typeDefs } = require('./graphql/index');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
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

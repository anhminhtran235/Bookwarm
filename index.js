const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { resolvers, typeDefs } = require('./graphql/index');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    debug: true,
});

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((res) => {
        console.log('Connected to MongoDb');
    });

server.listen({ port: process.env.PORT }).then((res) => {
    console.log(`Sever is running at ${res.url}`);
});

const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const config = require('config');

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
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

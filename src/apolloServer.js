const { ApolloServer } = require('apollo-server');
const { resolvers, typeDefs } = require('./graphql/index');

const setupApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
        debug: true,
    });
    server.listen({ port: process.env.PORT }).then((res) => {
        console.log(`Sever is running at ${res.url}`);
    });
    return server;
};

module.exports = setupApolloServer;

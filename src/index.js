const connectToDb = require('./db/mongoose');
const setupApolloServer = require('./apolloServer');

(async () => {
    await connectToDb();
    await setupApolloServer();
})();

const connectToDb = require('../src/db/mongoose');
const setupApolloServer = require('../src/apolloServer');

module.exports = globalSetupJest = async () => {
    await connectToDb();
    global.apolloServer = await setupApolloServer();
};

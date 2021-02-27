const mongoose = require('mongoose');

module.exports = globalTeardownJest = async () => {
    await mongoose.connection.close();
    await global.apolloServer.stop();
};

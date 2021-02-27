const mongoose = require('mongoose');

const connectToDb = () => {
    return mongoose
        .connect(process.env.MONGO_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            console.log('Connected to MongoDb');
        });
};

module.exports = connectToDb;

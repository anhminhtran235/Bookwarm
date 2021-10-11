const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose
        .connect(process.env.MONGO_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            // console.log('Connected to MongoDb');
        });
    return mongoose;
};

module.exports = connectToDb;

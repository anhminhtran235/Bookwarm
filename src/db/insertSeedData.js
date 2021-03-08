const mongoose = require('mongoose');

const Book = require('../models/book/Book');
const User = require('../models/user/User');
const bookData = require('./seedData/bookData');
const userData = require('./seedData/userData');

const MONGO_CONNECTION_STRING = 'YOUR CONNECTION STRING';

mongoose
    .connect(MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(async () => {
        try {
            console.log('Dropping existing database ...');
            await mongoose.connection.db.dropDatabase();

            console.log('Inserting user data...');
            await User.insertMany(userData);

            console.log('Inserting book data ...');
            await Book.insertMany(bookData);
            await mongoose.connection.close();
        } catch (error) {
            console.error(error);
        }
    });

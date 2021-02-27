const axios = require('axios');
const mongoose = require('mongoose');
const Seller = require('../src/models/seller/schema/Seller');
const { GRAPHQL_SERVER_URL } = require('./variables');

beforeEach(async () => {
    try {
        // await mongoose.connection.dropDatabase();
        await new Seller({
            username: 'dflksjsdflksdf',
            email: 'lfkdskjdfsl@gmail.com',
            password: 'ldfskjsldfkjsdflk',
        }).save();
    } catch (error) {
        console.error(error);
    }
});

test('My first db test', async () => {
    const response = await axios.post(GRAPHQL_SERVER_URL, {
        query: `
        query {
            findAllSellers{
              email
            }
        }
        
        `,
    });

    const { data } = response;
    expect(data).toMatchObject({ data: { findAllSellers: [] } });
});

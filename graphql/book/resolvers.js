const { ApolloError } = require('apollo-server');

const bookModule = require('../../models/book/Book');
const sellerModule = require('../../models/seller/Seller');
const authCheck = require('../../util/authCheck');

module.exports = {
    Query: {
        async getBooks() {
            try {
                return bookModule.findPaginate({}, { createdAt: -1 }, 0);
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        async addBook(parent, args, context, info) {
            try {
                const parsedToken = authCheck(context);
                const seller = await sellerModule.findById(parsedToken.id);
                if (!seller) {
                    throw new ApolloError('Cannot find seller profile');
                }
                const newBook = await bookModule.insert({
                    ...args,
                    seller: seller._id,
                });
                await sellerModule.addNewBook(seller._id, newBook._id);
                return newBook;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};

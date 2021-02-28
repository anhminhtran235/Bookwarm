const { ApolloError, AuthenticationError } = require('apollo-server');

const bookModule = require('../../models/book/Book');
const sellerModule = require('../../models/seller/Seller');
const authCheck = require('../../util/authCheck');

module.exports = {
    Query: {
        async findBooks(parent, args, context, info) {
            const { titleContains, minPrice, maxPrice } = args.criteria;
            const { skip, limit } = args;

            const criteria = [];
            if (titleContains) {
                criteria.push({ $text: { $search: `${titleContains}` } });
            }
            if (minPrice && maxPrice) {
                criteria.push({
                    $and: [
                        { price: { $gte: minPrice } },
                        { price: { $lte: maxPrice } },
                    ],
                });
            } else if (minPrice) {
                criteria.push({ price: { $gte: minPrice } });
            } else if (maxPrice) {
                criteria.push({ price: { $lte: maxPrice } });
            }

            let condition = {};
            if (criteria.length > 0) {
                condition = { $and: criteria };
            }

            try {
                return bookModule.findPaginate(
                    condition,
                    { createdAt: -1 },
                    skip,
                    limit
                );
            } catch (error) {
                throw new Error(error);
            }
        },
        async findBookById(parent, args, context, info) {
            try {
                const { id } = args;
                return await bookModule.findOneById(id);
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
        async updateBook(parent, args, context, info) {
            try {
                const { id } = args;
                delete args.id;

                const parsedToken = authCheck(context);
                const seller = await sellerModule.findById(parsedToken.id);
                if (!seller) {
                    throw new ApolloError('Cannot find seller profile');
                }
                if (seller._doc.books.includes(id)) {
                    const newBook = await bookModule.updateById(id, args);
                    if (!newBook) {
                        throw new ApolloError('Book does not exists');
                    }
                    return newBook;
                } else {
                    throw new AuthenticationError(
                        'You are not allowed to update this book'
                    );
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async deleteBook(parent, args, context, info) {
            try {
                const { id } = args;

                const parsedToken = authCheck(context);
                const seller = await sellerModule.findById(parsedToken.id);
                if (!seller) {
                    throw new ApolloError('Cannot find seller profile');
                }
                if (seller._doc.books.includes(id)) {
                    await bookModule.deleteById(id);
                    return 'Success';
                } else {
                    throw new AuthenticationError(
                        'You are not allowed to update this book'
                    );
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};

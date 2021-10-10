const { DataSource } = require('apollo-datasource');
const { ApolloError, AuthenticationError } = require('apollo-server');

const cloudinaryService = require('./CloudinaryService');
const { authCheck } = require('../util/authCheck');

class BookService extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async findPaginatedBooksFromCriteria(args) {
        try {
            const condition = this.constructConditionFromCriteria(
                args.criteria
            );
            const { skip, limit } = args;
            const books = await this.store.bookRepo.findPaginate(
                condition,
                { createdAt: -1 },
                skip,
                limit
            );
            return books;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findBookById(args) {
        try {
            const { id } = args;
            return await this.store.bookRepo.findOneById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getBookPaginationMeta(args) {
        try {
            const condition = this.constructConditionFromCriteria(
                args.criteria
            );
            const count = await this.store.bookRepo.countBooks(condition);
            return { count };
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRandomBooks(args) {
        try {
            const { limit } = args;
            const count = await this.store.bookRepo.countBooks();
            const randNumber = Math.floor(Math.random() * count);
            let skip = 0;
            if (count > randNumber + limit) {
                skip = randNumber;
            }

            return await this.store.bookRepo.findPaginate(
                {},
                null,
                skip,
                limit
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    async getDiscountedBooks(args) {
        try {
            const { limit } = args;
            return await this.store.bookRepo.findPaginate(
                { promotion: { $nin: [0, null, undefined] } },
                { createdAt: -1 },
                0,
                limit
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    async addBook(args) {
        try {
            const user = await authCheck(this.context.req, this.store.userRepo);

            if (args.image && args.image !== '') {
                args.image = (
                    await cloudinaryService.uploadImage(args.image)
                ).url;
            }

            const newBook = await this.store.bookRepo.insert({
                ...args,
                seller: user._id,
            });
            await this.store.userRepo.addNewBook(user._id, newBook._id);
            return newBook;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateBook(args) {
        try {
            const { id } = args;
            delete args.id;

            const user = await authCheck(this.context.req, this.store.userRepo);

            if (user._doc.books.includes(id)) {
                if (args.image && args.image !== '') {
                    args.image = (
                        await cloudinaryService.uploadImage(args.image)
                    ).url;
                }
                const newBook = await this.store.bookRepo.updateById(id, args);
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
    }

    async deleteBook(args) {
        try {
            const { id } = args;

            const user = await authCheck(this.context.req, this.store.userRepo);

            if (user._doc.books.includes(id)) {
                return await this.store.bookRepo.deleteById(id);
            } else {
                throw new AuthenticationError(
                    'You are not allowed to delete this book'
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAllByIds(bookIds) {
        const condition = {
            _id: {
                $in: bookIds,
            },
        };
        return await this.store.bookRepo.findAll(condition);
    }

    constructConditionFromCriteria(criteria) {
        const { titleContains } = criteria;

        criteria = [];
        if (titleContains) {
            const regex = new RegExp(`.*${titleContains}.*`, 'i');
            criteria.push({ title: regex });
        }

        let condition = {};
        if (criteria.length > 0) {
            condition = { $or: criteria };
        }
        return condition;
    }
}

module.exports = BookService;

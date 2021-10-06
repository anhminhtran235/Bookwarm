module.exports = {
    Query: {
        async findBooks(_, args, { dataSources }) {
            return await dataSources.bookService.findPaginatedBooksFromCriteria(
                args
            );
        },
        async findBookById(_, args, { dataSources }) {
            return await dataSources.bookService.findBookById(args);
        },
        async getBookPaginationMeta(_, args, { dataSources }) {
            return await dataSources.bookService.getBookPaginationMeta(args);
        },
        async getRandomBooks(_, args, { dataSources }) {
            return await dataSources.bookService.getRandomBooks(args);
        },
        async getDiscountedBooks(_, args, { dataSources }) {
            return await dataSources.bookService.getDiscountedBooks(args);
        },
    },
    Mutation: {
        async addBook(_, args, { dataSources }) {
            return await dataSources.bookService.addBook(args);
        },
        async updateBook(_, args, { dataSources }) {
            return await dataSources.bookService.updateBook(args);
        },
        async deleteBook(_, args, { dataSources }) {
            return await dataSources.bookService.deleteBook(args);
        },
    },
};

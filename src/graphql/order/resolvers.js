module.exports = {
    CartItem: {
        async book(parent, _, { dataSources, bookLoader }) {
            return await bookLoader.load(parent.book, dataSources.bookService);
        },
    },
    OrderItem: {
        async book(parent, _, { dataSources, bookLoader }) {
            return await bookLoader.load(parent.book, dataSources.bookService);
        },
    },
    Mutation: {
        async addToCart(_, args, { dataSources }) {
            return await dataSources.orderService.addToCart(args);
        },
        async removeFromCart(_, args, { dataSources }) {
            return await dataSources.orderService.removeFromCart(args);
        },
        async checkout(_, args, { dataSources }) {
            return await dataSources.orderService.checkout(args);
        },
    },
};

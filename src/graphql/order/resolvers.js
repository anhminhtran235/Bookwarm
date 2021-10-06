module.exports = {
    CartItem: {
        async book(parent, _, { dataSources }) {
            return await dataSources.bookService.findBookById({
                id: parent.book,
            });
        },
    },
    OrderItem: {
        async book(parent, _, { dataSources }) {
            return await dataSources.bookService.findBookById({
                id: parent.book,
            });
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

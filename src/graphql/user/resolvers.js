module.exports = {
    User: {
        async books(parent, _, { dataSources }) {
            return await dataSources.bookService.findAllByIds(parent.books);
        },
        async orders(parent, _, { dataSources }) {
            return await dataSources.orderService.findAllByIds(parent.orders);
        },
    },
    Query: {
        async findUserById(_, args, { dataSources }) {
            return await dataSources.userService.findUserById(args);
        },
        async findAllUsers() {
            return await dataSources.userService.findAllUsers();
        },
        async getMe(_, __, { dataSources }) {
            return await dataSources.userService.getMe();
        },
    },
    Mutation: {
        async register(_, args, { dataSources }) {
            return await dataSources.userService.register(args);
        },
        async login(_, args, { dataSources }) {
            return await dataSources.userService.login(args);
        },
        async logout(_, args, { dataSources }) {
            return await dataSources.userService.logout();
        },
        async updateUser(_, args, { dataSources }) {
            return await dataSources.userService.updateUser(args);
        },
    },
};

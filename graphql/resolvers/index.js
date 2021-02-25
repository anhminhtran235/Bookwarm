const buyerResolvers = require('./buyer');
const bookResolvers = require('./book');
const DateScalar = require('./DateScalar');

module.exports = {
    Date: DateScalar,
    Query: {
        ...buyerResolvers.Query,
        ...bookResolvers.Query,
    },
    Mutation: {
        ...buyerResolvers.Mutation,
    },
};

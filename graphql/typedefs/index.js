const gql = require('graphql-tag');

module.exports = gql`
    scalar Date

    type Buyer {
        id: ID!
        username: String!
        email: String!
        createdAt: Date!
        token: String!
    }
    type Seller {
        id: ID!
        username: String!
        email: String!
        createdAt: Date!
        avatar: String!
        token: String!
    }
    type Book {
        id: ID!
        book: ID!
        name: String!
        author: String!
        description: String!
        image: String
        price: Float!
    }
    type FindBookCriteria {
        id: ID
        nameStartsWith: String
        authorStartsWith: String
        minPrice: Float
        maxPrice: Float
    }
    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }
    type Query {
        getBuyers: [Buyer]
        getBooks: [Book]
    }
    type Mutation {
        registerBuyer(registerInput: RegisterInput): Buyer!
        loginBuyer(loginInput: LoginInput): Buyer!
        # registerSeller(registerInput: RegisterInput): Seller!
        # loginSeller(loginInput: LoginInput): Seller!

        # getBooks: [Book]
        # getBooks(where: FindBookCriteria): [Book]
    }
`;

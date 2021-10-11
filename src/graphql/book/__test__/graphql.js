const gql = require('graphql-tag');

const FIND_BOOKS_QUERY = gql`
    query findBooks($titleContains: String, $skip: Int, $limit: Int) {
        findBooks(
            criteria: { titleContains: $titleContains }
            skip: $skip
            limit: $limit
        ) {
            id
            title
            subtitle
            author
            description
            shortDescription
            image
            price
            promotion
        }
    }
`;

const SINGLE_BOOK_QUERY = gql`
    query findBookById($id: ID!) {
        findBookById(id: $id) {
            id
            title
            subtitle
            author
            description
            shortDescription
            image
            price
            promotion
        }
    }
`;

const ADD_BOOK_MUTATION = gql`
    mutation addBook(
        $title: String!
        $subtitle: String
        $author: String!
        $description: String!
        $shortDescription: String!
        $image: String!
        $price: Float!
    ) {
        addBook(
            title: $title
            subtitle: $subtitle
            author: $author
            description: $description
            shortDescription: $shortDescription
            image: $image
            price: $price
        ) {
            id
            title
            subtitle
            description
            shortDescription
            image
            price
            promotion
        }
    }
`;

module.exports = {
    FIND_BOOKS_QUERY,
    SINGLE_BOOK_QUERY,
    ADD_BOOK_MUTATION,
};

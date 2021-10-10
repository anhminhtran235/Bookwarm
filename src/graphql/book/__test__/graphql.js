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

module.exports = {
    FIND_BOOKS_QUERY,
};

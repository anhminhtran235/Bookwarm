const gql = require('graphql-tag');

const GET_ME_QUERY = gql`
    query {
        getMe {
            id
            username
            email
            avatar
            createdAt
            orders
            books {
                id
            }
        }
    }
`;

module.exports = {
    GET_ME_QUERY,
};

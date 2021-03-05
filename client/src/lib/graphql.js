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

const GET_CART_QUERY = gql`
    query {
        getMe {
            cart {
                id
                book {
                    id
                    title
                    description
                    image
                    price
                }
                quantity
            }
        }
    }
`;

module.exports = {
    GET_ME_QUERY,
    GET_CART_QUERY,
};

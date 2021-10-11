const gql = require('graphql-tag');

const REGISTER_USER_MUTATION = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $avatar: String
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                avatar: $avatar
            }
        ) {
            id
            username
            email
            avatar
            createdAt
            orders {
                id
            }
            cart {
                id
                book {
                    id
                }
                quantity
            }
            books {
                id
            }
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(loginInput: { email: $email, password: $password }) {
            id
            username
            email
            avatar
            createdAt
            orders {
                id
            }
            cart {
                id
                book {
                    id
                }
                quantity
            }
            books {
                id
            }
        }
    }
`;

module.exports = { REGISTER_USER_MUTATION, LOGIN_MUTATION };

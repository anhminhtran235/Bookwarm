const gql = require('graphql-tag');
const _ = require('lodash');

const GET_ME_QUERY = gql`
    query getMe {
        getMe {
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
const LOGOUT_MUTATION = gql`
    mutation {
        logout
    }
`;

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

const GET_CART_QUERY = gql`
    query getCart {
        getMe {
            cart {
                id
                book {
                    id
                    title
                    subtitle
                    description
                    shortDescription
                    image
                    price
                    promotion
                }
                quantity
            }
        }
    }
`;

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($bookId: ID!) {
        addToCart(bookId: $bookId) {
            quantity
            book {
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
    }
`;

const REMOVE_FROM_CART_MUTATION = gql`
    mutation addToCart($bookId: ID!) {
        removeFromCart(bookId: $bookId) {
            quantity
            book {
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
    }
`;

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

const GET_BOOK_PAGINATION_META_QUERY = gql`
    query getBookPaginationMeta($titleContains: String) {
        getBookPaginationMeta(criteria: { titleContains: $titleContains }) {
            count
        }
    }
`;

const GET_RANDOM_BOOK_QUERY = gql`
    query getRandomBooks($limit: Int) {
        getRandomBooks(limit: $limit) {
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

const GET_DISCOUNTED_BOOKS = gql`
    query getDiscountedBooks($limit: Int) {
        getDiscountedBooks(limit: $limit) {
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

const UPDATE_BOOK_MUTATION = gql`
    mutation updateBook(
        $id: ID!
        $title: String
        $subtitle: String
        $author: String
        $description: String
        $shortDescription: String
        $image: String
        $price: Float
        $promotion: Float
    ) {
        updateBook(
            id: $id
            title: $title
            subtitle: $subtitle
            author: $author
            description: $description
            shortDescription: $shortDescription
            image: $image
            price: $price
            promotion: $promotion
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

const DELETE_BOOK_MUTATION = gql`
    mutation deleteBook($id: ID!) {
        deleteBook(id: $id) {
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

const CHECKOUT_MUTATION = gql`
    mutation checkout($password: String!) {
        checkout(password: $password) {
            orderItems {
                id
                book {
                    title
                }
                quantity
                pricePerItem
            }
            createdAt
        }
    }
`;

const UPDATE_USER_MUTATION = gql`
    mutation updateUser(
        $username: String!
        $oldPassword: String!
        $newPassword: String!
    ) {
        updateUser(
            username: $username
            oldPassword: $oldPassword
            newPassword: $newPassword
        ) {
            username
        }
    }
`;

const GET_ORDERS_QUERY = gql`
    query getOrders {
        getMe {
            orders {
                id
                orderItems {
                    book {
                        id
                        title
                        subtitle
                        description
                        shortDescription
                        image
                        price
                        promotion
                        author
                    }
                    quantity
                    pricePerItem
                }
                createdAt
            }
        }
    }
`;

const cacheUpdateAddToCart = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: GET_CART_QUERY }));
    if (!data) return;
    const cartItemAdded = payload.data.addToCart;
    const index = data.getMe.cart.findIndex(
        (item) => item.book.id === cartItemAdded.book.id
    );
    if (index === -1) {
        data.getMe.cart.push(cartItemAdded);
    } else {
        data.getMe.cart[index].quantity++;
    }
    cache.writeQuery({
        query: GET_CART_QUERY,
        data,
    });
};

const cacheUpdateRemoveFromCart = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: GET_CART_QUERY }));
    if (!data) return;
    const cartItemRemoved = payload.data.removeFromCart;
    const index = data.getMe.cart.findIndex(
        (item) => item.book.id === cartItemRemoved.book.id
    );
    if (index !== -1) {
        data.getMe.cart[index].quantity--;
        if (data.getMe.cart[index].quantity <= 0) {
            data.getMe.cart.splice(index, 1);
        }
        cache.writeQuery({
            query: GET_CART_QUERY,
            data,
        });
    }
};

const cacheUpdateAddBook = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: FIND_BOOKS_QUERY }));
    if (!data) return;
    const bookAdded = payload.data.addBook;
    cache.writeQuery({
        query: FIND_BOOKS_QUERY,
        data: {
            findBooks: [bookAdded, ...data.findBooks],
        },
    });

    const meta = _.cloneDeep(
        cache.readQuery({ query: GET_BOOK_PAGINATION_META_QUERY })
    );
    if (!meta) return;
    cache.writeQuery({
        query: GET_BOOK_PAGINATION_META_QUERY,
        variables: {
            criteria: {},
        },
        data: {
            getBookPaginationMeta: {
                ...meta.getBookPaginationMeta,
                count: meta.getBookPaginationMeta.count + 1,
            },
        },
    });

    const user = _.cloneDeep(cache.readQuery({ query: GET_ME_QUERY }));
    if (!user) return;
    user.getMe.books.push(payload.data.addBook.id);
    cache.writeQuery({
        query: GET_ME_QUERY,
        data: {
            getMe: user,
        },
    });
};

const cacheUpdateUpdateBook = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: FIND_BOOKS_QUERY }));
    if (!data) return;
    const bookUpdated = payload.data.updateBook;
    data.findBooks = data.findBooks.filter(
        (book) => book.id !== bookUpdated.id
    );
    cache.writeQuery({
        query: FIND_BOOKS_QUERY,
        data: {
            findBooks: [bookUpdated, ...data.findBooks],
        },
    });
};

const cacheUpdateDeleteBook = (cache, payload) => {
    cache.evict(cache.identify(payload.data.deleteBook));

    const meta = _.cloneDeep(
        cache.readQuery({ query: GET_BOOK_PAGINATION_META_QUERY })
    );
    if (!meta) return;
    cache.writeQuery({
        query: GET_BOOK_PAGINATION_META_QUERY,
        variables: {
            criteria: {},
        },
        data: {
            getBookPaginationMeta: {
                ...meta.getBookPaginationMeta,
                count: meta.getBookPaginationMeta.count - 1,
            },
        },
    });
};

const cacheUpdateCheckout = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: GET_CART_QUERY }));
    if (!data) return;
    cache.writeQuery({
        query: GET_CART_QUERY,
        data: {
            getMe: {
                ...data.getMe,
                cart: [],
            },
        },
    });
};

const cacheUpdateUpdateUser = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: GET_ME_QUERY }));
    if (!data) return;
    cache.writeQuery({
        query: GET_ME_QUERY,
        data: {
            getMe: {
                ...data.getMe,
                username: payload.data.updateUser.username,
            },
        },
    });
};

const cacheUpdateLogout = (cache, payload) => {
    cache.writeQuery({
        query: GET_ME_QUERY,
        data: {
            getMe: null,
        },
    });
};

const cacheUpdateLogin = (cache, payload) => {
    const user = payload?.data?.login;
    if (!user) return;
    cache.writeQuery({
        query: GET_ME_QUERY,
        data: {
            getMe: user,
        },
    });
};

const cacheUpdateRegister = (cache, payload) => {
    const user = payload?.data?.register;
    if (!user) return;
    cache.writeQuery({
        query: GET_ME_QUERY,
        data: {
            getMe: user,
        },
    });
};

module.exports = {
    GET_ME_QUERY,
    LOGIN_MUTATION,
    LOGOUT_MUTATION,
    REGISTER_USER_MUTATION,
    GET_CART_QUERY,
    FIND_BOOKS_QUERY,
    GET_BOOK_PAGINATION_META_QUERY,
    GET_RANDOM_BOOK_QUERY,
    GET_DISCOUNTED_BOOKS,
    ADD_TO_CART_MUTATION,
    REMOVE_FROM_CART_MUTATION,
    ADD_BOOK_MUTATION,
    UPDATE_BOOK_MUTATION,
    DELETE_BOOK_MUTATION,
    SINGLE_BOOK_QUERY,
    CHECKOUT_MUTATION,
    UPDATE_USER_MUTATION,
    GET_ORDERS_QUERY,
    cacheUpdateAddToCart,
    cacheUpdateRemoveFromCart,
    cacheUpdateAddBook,
    cacheUpdateUpdateBook,
    cacheUpdateDeleteBook,
    cacheUpdateCheckout,
    cacheUpdateUpdateUser,
    cacheUpdateLogout,
    cacheUpdateLogin,
    cacheUpdateRegister,
};

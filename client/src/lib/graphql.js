const gql = require('graphql-tag');
const _ = require('lodash');

const GET_ME_QUERY = gql`
    query {
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

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($bookId: ID!) {
        addToCart(bookId: $bookId) {
            quantity
            book {
                id
                title
                author
                description
                image
                price
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
                author
                description
                image
                price
            }
        }
    }
`;

const FIND_BOOKS_QUERY = gql`
    query findBooks(
        $titleContains: String
        $minPrice: Float
        $maxPrice: Float
        $skip: Int
        $limit: Int
    ) {
        findBooks(
            criteria: {
                titleContains: $titleContains
                minPrice: $minPrice
                maxPrice: $maxPrice
            }
            skip: $skip
            limit: $limit
        ) {
            id
            title
            description
            image
            price
        }
    }
`;

const ADD_BOOK_MUTATION = gql`
    mutation addBook(
        $title: String!
        $author: String!
        $description: String!
        $image: String!
        $price: Float!
    ) {
        addBook(
            title: $title
            author: $author
            description: $description
            image: $image
            price: $price
        ) {
            id
            title
            description
            image
            price
        }
    }
`;

const UPDATE_BOOK_MUTATION = gql`
    mutation updateBook(
        $id: ID!
        $title: String
        $author: String
        $description: String
        $image: String
        $price: Float
    ) {
        updateBook(
            id: $id
            title: $title
            author: $author
            description: $description
            image: $image
            price: $price
        ) {
            id
            title
            author
            description
            image
            price
        }
    }
`;

const DELETE_BOOK_MUTATION = gql`
    mutation deleteBook($id: ID!) {
        deleteBook(id: $id) {
            id
            title
            author
            description
            image
            price
        }
    }
`;

const SINGLE_BOOK_QUERY = gql`
    query findBookById($id: ID!) {
        findBookById(id: $id) {
            id
            title
            description
            image
            price
            author
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

const cacheUpdateAddToCart = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: GET_CART_QUERY }));
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
    const bookAdded = payload.data.addBook;
    cache.writeQuery({
        query: FIND_BOOKS_QUERY,
        data: {
            findBooks: [bookAdded, ...data.findBooks],
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
    const data = _.cloneDeep(cache.readQuery({ query: FIND_BOOKS_QUERY }));
    if (!data) return;
    const bookRemoved = payload.data.deleteBook;
    data.findBooks = data.findBooks.filter(
        (book) => book.id !== bookRemoved.id
    );
    cache.writeQuery({
        query: FIND_BOOKS_QUERY,
        data: {
            findBooks: [...data.findBooks],
        },
    });
};

const cacheUpdateCheckout = (cache, payload) => {
    const data = _.cloneDeep(cache.readQuery({ query: GET_CART_QUERY }));
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

module.exports = {
    GET_ME_QUERY,
    GET_CART_QUERY,
    FIND_BOOKS_QUERY,
    ADD_TO_CART_MUTATION,
    REMOVE_FROM_CART_MUTATION,
    ADD_BOOK_MUTATION,
    UPDATE_BOOK_MUTATION,
    DELETE_BOOK_MUTATION,
    SINGLE_BOOK_QUERY,
    CHECKOUT_MUTATION,
    cacheUpdateAddToCart,
    cacheUpdateRemoveFromCart,
    cacheUpdateAddBook,
    cacheUpdateUpdateBook,
    cacheUpdateDeleteBook,
    cacheUpdateCheckout,
};

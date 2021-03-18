import { useQuery } from '@apollo/client';

import { BooksStyle } from '../../../styles/ShoppingStyle';
import Book from '../../Book/Book';
import { FIND_BOOKS_QUERY } from '../../../lib/graphql';
import Loader from '../../Loader/Loader';

const Books = ({ match, perPage }) => {
    const page = match.params.page || 1;
    const { loading, data } = useQuery(FIND_BOOKS_QUERY, {
        variables: {
            criteria: {},
            skip: (page - 1) * perPage,
            limit: perPage,
        },
    });
    const books = data?.findBooks;

    return (
        <BooksStyle>
            {loading && <Loader />}
            {books && books.length && books.map((book) => <Book book={book} />)}
        </BooksStyle>
    );
};

export default Books;

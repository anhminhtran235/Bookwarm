import { Row } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import Book from './Book/Book';
import { FIND_BOOKS_QUERY } from '../../lib/graphql';
import { useUser } from '../../lib/util';

const Books = () => {
    const me = useUser();
    const { loading, data } = useQuery(FIND_BOOKS_QUERY, {
        variables: {
            criteria: {},
        },
    });
    const books = data?.findBooks;

    return loading ? (
        <p>Loading...</p>
    ) : (
        <Row className='justify-content-md-center'>
            {books &&
                books.map((book) => {
                    const isMine =
                        me?.books.findIndex((b) => b.id === book.id) !== 0;
                    return <Book key={book.id} book={book} isMine={isMine} />;
                })}
        </Row>
    );
};

export default Books;

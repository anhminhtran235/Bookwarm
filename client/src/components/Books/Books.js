import { Row } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Book from './Book/Book';

const Books = () => {
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
                books.map((book) => (
                    <Book
                        key={book.id}
                        title={book.title}
                        description={book.description}
                        image={book.image}
                        price={book.price}
                    />
                ))}
        </Row>
    );
};

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

export default Books;

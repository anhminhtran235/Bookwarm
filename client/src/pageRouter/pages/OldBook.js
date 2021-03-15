import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { SINGLE_BOOK_QUERY } from '../../lib/graphql';
import AddToCartButton from '../../components/Books/Book/AddToCartButton/AddToCartButton';

const Container = styled.div`
    display: flex;
    margin-top: 20px;
`;

const Image = styled.img`
    height: 400px;
`;

const BookInfo = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    h1,
    h2 {
        text-align: center;
    }
    h2 {
        margin-bottom: 20px;
    }
    p {
        padding-left: 20px;
    }
`;

const Book = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(SINGLE_BOOK_QUERY, {
        variables: { id },
    });

    const book = data?.findBookById;

    return loading ? (
        'Loading...'
    ) : (
        <Container>
            <Image src={book?.image} />
            <BookInfo>
                <h1>{book?.title}</h1>
                <h2>By {book?.author}</h2>
                <p>{book?.description}</p>
                <p>Price: ${book?.price}</p>
                <AddToCartButton bookId={id} />
            </BookInfo>
        </Container>
    );
};

export default Book;

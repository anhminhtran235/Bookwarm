import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import {
    SINGLE_BOOK_QUERY,
    ADD_TO_CART_MUTATION,
    cacheUpdateAddToCart,
} from '../lib/graphql';

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

const AddToCartButton = styled(Button)`
    align-self: center;
`;

const Book = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(SINGLE_BOOK_QUERY, {
        variables: { id },
    });

    const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            bookId: id,
        },
        update(cache, payload) {
            cacheUpdateAddToCart(cache, payload);
        },
        onError(error) {
            console.log(error);
        },
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
                <AddToCartButton />
            </BookInfo>
        </Container>
    );
};

export default Book;

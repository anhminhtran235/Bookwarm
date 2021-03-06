import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';

import {
    cacheUpdateDeleteBook,
    DELETE_BOOK_MUTATION,
} from '../../../lib/graphql';

import * as alertify from '../../../lib/alertify';

const RemoveBookButton = ({ bookId }) => {
    const [removeBook, { loading }] = useMutation(DELETE_BOOK_MUTATION, {
        variables: {
            id: bookId,
        },
        update(cache, payload) {
            alertify.error('Book removed');
            cacheUpdateDeleteBook(cache, payload);
        },
        onError(error) {
            console.log(error);
        },
    });

    return (
        <Button bg='dark' variant='dark' onClick={removeBook}>
            Remove
        </Button>
    );
};

export default RemoveBookButton;

import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import alertify from 'alertifyjs';

import {
    cacheUpdateDeleteBook,
    DELETE_BOOK_MUTATION,
} from '../../../lib/graphql';

const RemoveBookButton = ({ bookId }) => {
    const [removeBook, { loading }] = useMutation(DELETE_BOOK_MUTATION, {
        variables: {
            id: bookId,
        },
        update(cache, payload) {
            alertify.error('Book removed');
            cacheUpdateDeleteBook(cache, payload);
        },
    });

    return (
        <Button bg='dark' variant='dark' onClick={removeBook}>
            Remove
        </Button>
    );
};

export default RemoveBookButton;

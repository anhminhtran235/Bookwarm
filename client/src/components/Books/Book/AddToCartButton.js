import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';

import {
    cacheUpdateAddToCart,
    ADD_TO_CART_MUTATION,
} from '../../../lib/graphql';

const AddToCartButton = ({ bookId }) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            bookId,
        },
        update(cache, payload) {
            cacheUpdateAddToCart(cache, payload);
        },
        onError(error) {
            console.log(error);
        },
    });

    return (
        <Button bg='dark' variant='dark' onClick={addToCart}>
            Add to cart
        </Button>
    );
};

export default AddToCartButton;

import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';
import { Button } from 'react-bootstrap';

import {
    cacheUpdateAddToCart,
    ADD_TO_CART_MUTATION,
} from '../../../../lib/graphql';

const AddToCartButton = ({ bookId }) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            bookId,
        },
        update(cache, payload) {
            alertify.success('Added to cart');
            cacheUpdateAddToCart(cache, payload);
        },
    });

    return (
        <Button
            bg='dark'
            variant='dark'
            style={{ display: 'block' }}
            onClick={addToCart}
        >
            Add to cart
        </Button>
    );
};

export default AddToCartButton;

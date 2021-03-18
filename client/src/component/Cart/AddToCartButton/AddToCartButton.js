import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';
import {
    cacheUpdateAddToCart,
    ADD_TO_CART_MUTATION,
} from '../../../lib/graphql';

const AddToCartButton = ({ bookId, className }) => {
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
        <button onClick={addToCart} className={className}>
            Add to cart
        </button>
    );
};

export default AddToCartButton;

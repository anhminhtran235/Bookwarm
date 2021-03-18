import { useMutation } from '@apollo/client';

import {
    Item,
    ItemImage,
    InfoAndOptions,
    ItemOptions,
    Button,
} from '../../../../styles/CartModalStyle';
import {
    ADD_TO_CART_MUTATION,
    REMOVE_FROM_CART_MUTATION,
    cacheUpdateAddToCart,
    cacheUpdateRemoveFromCart,
} from '../../../../lib/graphql';

const CartItem = ({
    cartItem: {
        book: { id, image, price, title },
        quantity,
    },
}) => {
    const subTotal = price * quantity;
    const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
        variables: { bookId: id },
        update(cache, result) {
            cacheUpdateAddToCart(cache, result);
        },
    });

    const [removeFromCart] = useMutation(REMOVE_FROM_CART_MUTATION, {
        variables: { bookId: id },
        update(cache, result) {
            cacheUpdateRemoveFromCart(cache, result);
        },
    });

    return (
        <Item>
            <ItemImage src={image} />
            <InfoAndOptions>
                <div>
                    <p className='book-title'>{title}</p>
                    <p className='info'>Price: ${price}</p>
                    <p className='info'>Quantity: {quantity}</p>
                    <p className='info'>Subtotal: ${subTotal}</p>
                </div>
                <ItemOptions>
                    <Button className='mr-2 minus' onClick={removeFromCart}>
                        -
                    </Button>
                    {quantity}
                    <Button className='ml-2 plus' onClick={addToCart}>
                        +
                    </Button>
                </ItemOptions>
            </InfoAndOptions>
        </Item>
    );
};

export default CartItem;

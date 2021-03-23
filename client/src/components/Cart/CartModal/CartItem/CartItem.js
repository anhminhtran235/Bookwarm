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
        book: { id, image, price, promotion, title },
        quantity,
    },
}) => {
    const realPrice = promotion ? (price * (100 - promotion)) / 100 : price;
    const subTotal = quantity * realPrice;

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
                    <p className='info'>
                        Price:{' '}
                        {promotion !== 0 && (
                            <strike className='promotion'>
                                ${price.toFixed(2)}
                            </strike>
                        )}
                        ${realPrice.toFixed(2)}
                    </p>
                    <p className='info'>Quantity: {quantity}</p>
                    <p className='info'>Subtotal: ${subTotal.toFixed(2)}</p>
                </div>
                <ItemOptions>
                    <Button className='minus' onClick={removeFromCart}>
                        -
                    </Button>
                    {quantity}
                    <Button className='plus' onClick={addToCart}>
                        +
                    </Button>
                </ItemOptions>
            </InfoAndOptions>
        </Item>
    );
};

export default CartItem;

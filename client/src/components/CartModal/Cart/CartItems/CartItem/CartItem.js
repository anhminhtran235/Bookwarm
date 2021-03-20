import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import {
    ADD_TO_CART_MUTATION,
    REMOVE_FROM_CART_MUTATION,
    cacheUpdateAddToCart,
    cacheUpdateRemoveFromCart,
} from '../../../../../lib/graphql';
import { useMutation } from '@apollo/client';

const Item = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 15px;
`;

const InfoLine = styled.div`
    padding: 0;
    margin: 0;
`;

const ItemImage = styled.img`
    height: 7rem;
    width: 5rem;
    object-fit: fill;
`;

const InfoAndOptions = styled.div`
    padding-left: 20px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
`;

const ItemOptions = styled.div`
    display: flex;
    align-items: center;
`;

const CartItem = ({ cartItem: { book, quantity } }) => {
    const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
        variables: { bookId: book.id },
        update(cache, result) {
            cacheUpdateAddToCart(cache, result);
        },
    });

    const [removeFromCart] = useMutation(REMOVE_FROM_CART_MUTATION, {
        variables: { bookId: book.id },
        update(cache, result) {
            cacheUpdateRemoveFromCart(cache, result);
        },
    });

    return (
        <Item>
            <ItemImage src={book.image} alt='Book image' />
            <InfoAndOptions>
                <div>
                    <InfoLine>{book.title}</InfoLine>
                    <InfoLine>Price: ${book.price}</InfoLine>
                    <InfoLine>Quantity: {quantity}</InfoLine>
                    <InfoLine>
                        Subtotal: ${(book.price * quantity).toFixed(2)}
                    </InfoLine>
                </div>
                <ItemOptions>
                    <Button className='mr-2' onClick={addToCart}>
                        +
                    </Button>
                    {quantity}
                    <Button className='ml-2' onClick={removeFromCart}>
                        -
                    </Button>
                </ItemOptions>
            </InfoAndOptions>
        </Item>
    );
};

export default CartItem;

import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import CartItems from './CartItems/CartItems';
import { GET_CART_QUERY } from '../../../lib/graphql';

const Header = styled.div`
    text-align: center;
    margin: auto;
    font-size: 35px;
    font-weight: bold;
`;

const TotalPrice = styled.div`
    text-align: end;
    font-size: 20px;
    font-weight: 600;
`;

const CartInfo = () => {
    const { data, loading } = useQuery(GET_CART_QUERY);
    const cartItems = data?.getMe?.cart;
    let total = 0;
    if (cartItems) {
        cartItems.forEach((item) => {
            total += item.quantity * item.book.price;
        });
    }
    return cartItems ? (
        <>
            <Header>My cart</Header>
            <CartItems cartItems={cartItems} />
            <TotalPrice>
                <p className='pr-3 pb-1'>Total: ${total}</p>
            </TotalPrice>
        </>
    ) : (
        'Loading...'
    );
};

export default CartInfo;

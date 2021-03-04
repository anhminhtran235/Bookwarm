import styled from 'styled-components';

import CartItem from './CartItem/CartItem';

const Container = styled.div`
    padding: 15px 20px 0px 20px;
    div:last-child {
        padding-bottom: 0;
    }
`;

const CartItems = () => {
    return (
        <Container>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
        </Container>
    );
};

export default CartItems;

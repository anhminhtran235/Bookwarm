import styled from 'styled-components';

import CartItems from './CartItems/CartItems';

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
    return (
        <>
            <Header>My cart</Header>
            <CartItems />
            <TotalPrice>
                <p className='pr-3 pb-1'>Total: $230.65</p>
            </TotalPrice>
        </>
    );
};

export default CartInfo;

import styled from 'styled-components';
import { Button, Nav } from 'react-bootstrap';

import { useCart } from '../../../CartStateProvider';

const ItemCount = styled.div`
    position: absolute;
    top: -7px;
    right: -6px;
    background: red;
    border-radius: 80%;
    padding: 2px 4px;
    color: white;
`;

const CartButton = ({ cart }) => {
    const { openCart } = useCart();
    let cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0);
    return (
        <Nav.Link as={Button} onClick={openCart} className='position-relative'>
            My cart
            {cartItemCount !== 0 && <ItemCount>{cartItemCount}</ItemCount>}
        </Nav.Link>
    );
};

export default CartButton;

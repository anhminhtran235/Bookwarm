import styled from 'styled-components';

import Cart from './Cart/Cart';
import { useCart } from '../CartStateProvider';

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, ${(props) => (props.show ? '-50%' : '-200%')});
    transition: 0.5s ease-out;
    width: 600px;
    height: 400px;
    z-index: 100;
    background: white;
    overflow-y: scroll;
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: 0.5s ease-out;
    z-index: ${(props) => (props.show ? 99 : -100)};
    opacity: ${(props) => (props.show ? 0.7 : 0)};
    background: grey;
`;

const CartModal = () => {
    const { cartOpen, closeCart } = useCart();
    return (
        <>
            <Backdrop show={cartOpen} onClick={closeCart}></Backdrop>
            <Modal show={cartOpen}>
                <Cart />
            </Modal>
        </>
    );
};

export default CartModal;

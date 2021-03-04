import styled from 'styled-components';
import { connect } from 'react-redux';

import CartInfo from './CartInfo/CartInfo';
import { closeCart } from '../../redux/actions/cart';

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
    content: 'dfsdf${(props) => JSON.stringify(props)}';
`;

const CartModal = ({ showCart, closeCart }) => {
    return (
        <>
            <Backdrop show={showCart} onClick={closeCart}></Backdrop>
            <Modal show={showCart}>
                <CartInfo />
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    showCart: state.cartReducer.show,
});

export default connect(mapStateToProps, { closeCart })(CartModal);

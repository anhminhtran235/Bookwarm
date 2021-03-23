import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import alertify from 'alertifyjs';

import {
    Modal,
    Backdrop,
    TotalPrice,
    CheckoutButton,
    Form,
} from '../../../styles/CartModalStyle';
import { useCart } from '../../CartStateProvider';
import CartItem from './CartItem/CartItem';
import {
    GET_CART_QUERY,
    CHECKOUT_MUTATION,
    cacheUpdateCheckout,
} from '../../../lib/graphql';
import { useUser } from '../../../lib/util';
import Loader from '../../Loader/Loader';

const CartModal = () => {
    const user = useUser();
    const isLoggedIn = user != null;

    const { cartOpen, closeCart } = useCart();
    const [state, setState] = useState({
        password: '',
        formEnabled: false,
    });

    const { data, loading } = useQuery(GET_CART_QUERY);
    const cartItems = data?.getMe?.cart;
    let total = 0;
    if (cartItems) {
        cartItems.forEach((item) => {
            const realPrice = item.book.promotion
                ? (item.book.price * (100 - item.book.promotion)) / 100
                : item.book.price;
            total += item.quantity * realPrice;
        });
    }

    const [checkout, { loading: checkoutLoading }] = useMutation(
        CHECKOUT_MUTATION,
        {
            variables: { password: state.password },
            update(cache, result) {
                alertify.success('Purchase successully');
                cacheUpdateCheckout(cache, result);
            },
        }
    );

    const enableForm = () => {
        setState({
            ...state,
            formEnabled: true,
        });
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        checkout();
    };

    let cartDisplay = null;
    if (!isLoggedIn) {
        cartDisplay = <p>Please login first</p>;
    } else if (cartItems && cartItems.length === 0) {
        cartDisplay = <p>You have no item in your cart</p>;
    } else if (cartItems && cartItems.length > 0) {
        cartDisplay = (
            <>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
                <TotalPrice>
                    <p className='pr-3 pb-1'>Total: ${total.toFixed(2)}</p>
                </TotalPrice>
                {!state.formEnabled && (
                    <CheckoutButton onClick={enableForm}>
                        CHECKOUT
                    </CheckoutButton>
                )}

                {state.formEnabled && (
                    <Form>
                        <input
                            type='password'
                            placeholder='Re-enter your password *'
                            name='password'
                            value={state.password}
                            onChange={handleChange}
                            disabled={checkoutLoading}
                            required
                        />
                        <CheckoutButton
                            onClick={onSubmit}
                            disabled={checkoutLoading}
                        >
                            CHECKOUT
                        </CheckoutButton>
                    </Form>
                )}
            </>
        );
    }

    return (
        <>
            <Backdrop show={cartOpen} onClick={closeCart} />
            <Modal show={cartOpen}>
                <h2>My Cart</h2>
                {checkoutLoading ? <Loader /> : null}
                {cartDisplay}
            </Modal>
        </>
    );
};

export default CartModal;

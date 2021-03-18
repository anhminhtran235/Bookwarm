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

const CartModal = () => {
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
            total += item.quantity * item.book.price;
        });
    }

    const [checkout] = useMutation(CHECKOUT_MUTATION, {
        variables: { password: state.password },
        update(cache, result) {
            alertify.success('Purchase successully');
            cacheUpdateCheckout(cache, result);
        },
    });

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
    return (
        <>
            <Backdrop show={cartOpen} onClick={closeCart} />
            <Modal show={cartOpen}>
                <h2>My Cart</h2>
                {cartItems &&
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))}

                <TotalPrice>
                    <p className='pr-3 pb-1'>Total: ${total}</p>
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
                            placeholder='Re-enter your password'
                            name='password'
                            value={state.password}
                            onChange={handleChange}
                        />
                        <CheckoutButton onClick={onSubmit}>
                            CHECKOUT
                        </CheckoutButton>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default CartModal;

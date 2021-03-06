import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Button, Form, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import CartItems from './CartItems/CartItems';
import {
    GET_CART_QUERY,
    CHECKOUT_MUTATION,
    cacheUpdateCheckout,
} from '../../../lib/graphql';
import * as alertify from '../../../lib/alertify';

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

    const [checkout] = useMutation(CHECKOUT_MUTATION, {
        variables: { password: state.password },
        update(cache, result) {
            alertify.success('Purchase successully');
            cacheUpdateCheckout(cache, result);
        },
        onError(error) {
            console.log(error);
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        checkout();
    };
    return cartItems ? (
        cartItems.length > 0 ? (
            <>
                <Header>My cart</Header>
                <CartItems cartItems={cartItems} />
                <TotalPrice>
                    <p className='pr-3 pb-1'>Total: ${total}</p>
                </TotalPrice>

                {!state.formEnabled && (
                    <Button className='ml-3' onClick={enableForm}>
                        Checkout
                    </Button>
                )}

                {state.formEnabled && (
                    <Form onSubmit={onSubmit}>
                        <Form.Group as={Col} controlId='formGridPassword'>
                            <Form.Label>
                                Please re-enter your password
                            </Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={state.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button className='ml-3 mb-4' type='submit'>
                            Confirm Purchase
                        </Button>
                    </Form>
                )}
            </>
        ) : (
            <>
                <Header>My cart</Header>
                <p className='pl-3'>Your cart is empty</p>
            </>
        )
    ) : (
        'Loading...'
    );
};

export default CartInfo;

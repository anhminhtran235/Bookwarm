import { Card, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import _ from 'lodash';

import * as alertify from '../../../lib/alertify';
import { GET_CART_QUERY } from '../../../lib/graphql';

const Book = ({ id, title, description, image }) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            bookId: id,
        },
        update(cache, payload) {
            const data = _.cloneDeep(
                cache.readQuery({ query: GET_CART_QUERY })
            );
            const cartItemAdded = payload.data.addToCart;
            const index = data.getMe.cart.findIndex(
                (item) => item.book.id === cartItemAdded.book.id
            );
            if (index === -1) {
                data.getMe.cart.push(cartItemAdded);
            } else {
                data.getMe.cart[index].quantity++;
            }
            cache.writeQuery({
                query: GET_CART_QUERY,
                data,
            });
        },
        onError(error) {
            console.log(error);
        },
    });

    return (
        <Card className='mr-4 mt-4' style={{ width: '18rem', height: '28rem' }}>
            <Card.Img
                style={{ height: '18rem', objectFit: 'contain' }}
                variant='top'
                src={image}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Button bg='dark' variant='dark' onClick={addToCart}>
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    );
};

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($bookId: ID!) {
        addToCart(bookId: $bookId) {
            quantity
            book {
                id
                title
                author
                description
                image
                price
            }
        }
    }
`;

export default Book;

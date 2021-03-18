import { useMutation } from '@apollo/client';
import alertify from 'alertifyjs';
import { withRouter } from 'react-router';

import {
    BookStyle,
    BookInfo,
    ButtonGroup,
    BookButton,
} from '../../styles/BookStyle';
import { cacheUpdateAddToCart, ADD_TO_CART_MUTATION } from '../../lib/graphql';

const Book = ({ book: { id, image, title, author, price }, history }) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            bookId: id,
        },
        update(cache, payload) {
            alertify.success('Added to cart');
            cacheUpdateAddToCart(cache, payload);
        },
    });

    const goToBook = () => {
        history.push('/book/' + id);
    };

    return (
        <BookStyle>
            <img src={image} alt='' />
            <BookInfo>
                <p className='book-title'>{title}</p>
                <p className='book-author'>{author}</p>
                <p className='book-price'>${price}</p>
                <ButtonGroup>
                    <BookButton onClick={goToBook}>Detail</BookButton>
                    <BookButton onClick={addToCart}>Add to cart</BookButton>
                </ButtonGroup>
            </BookInfo>
        </BookStyle>
    );
};

export default withRouter(Book);

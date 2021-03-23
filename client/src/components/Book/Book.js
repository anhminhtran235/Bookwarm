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
import { useUser } from '../../lib/util';

const Book = ({
    book: { id, image, title, author, price, promotion },
    history,
}) => {
    const user = useUser();
    const isLoggedIn = user != null;

    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            bookId: id,
        },
        update(cache, payload) {
            alertify.success('Added to cart');
            cacheUpdateAddToCart(cache, payload);
        },
    });

    const onAddToCart = () => {
        if (!isLoggedIn) {
            alertify.error('Please log in first');
            history.push('/login');
        } else {
            addToCart();
        }
    };

    const goToBook = () => {
        history.push('/book/' + id);
    };

    const goToEditBook = () => {
        history.push('/edit/book/' + id);
    };

    const realPrice = promotion ? (price * (100 - promotion)) / 100 : price;
    const isMine =
        user?.books && user.books.findIndex((book) => book.id === id) !== -1;

    return (
        <BookStyle>
            {promotion != 0 && (
                <span className='promotion-tag'>SALE {promotion}%</span>
            )}
            <img src={image} alt='' />
            <BookInfo>
                <p className='book-title'>{title}</p>
                <p className='book-author'>{author}</p>
                <p className='book-price'>
                    {promotion !== 0 && (
                        <strike className='promotion'>
                            ${price.toFixed(2)}
                        </strike>
                    )}
                    ${realPrice.toFixed(2)}
                </p>
                <ButtonGroup>
                    <BookButton onClick={goToBook}>Detail</BookButton>
                    {!isMine && (
                        <BookButton onClick={onAddToCart}>
                            Add to cart
                        </BookButton>
                    )}
                    {isMine && (
                        <BookButton onClick={goToEditBook}>
                            Edit Book
                        </BookButton>
                    )}
                </ButtonGroup>
            </BookInfo>
        </BookStyle>
    );
};

export default withRouter(Book);

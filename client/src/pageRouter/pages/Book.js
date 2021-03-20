import { useParams, withRouter } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import alertify from 'alertifyjs';

import Navbar from '../../component/Navbar/Navbar';
import BookComponent from '../../component/Book/Book';
import {
    BookPageStyle,
    BooksContainer,
    Container,
    Description,
    PriceBox,
    RelatedBooks,
    Showcase,
    ShowcaseInfo,
    ShowcaseTop,
    ImageContainer,
} from '../../styles/BookPageStyle';
import {
    ADD_TO_CART_MUTATION,
    GET_RANDOM_BOOK_QUERY,
    SINGLE_BOOK_QUERY,
    cacheUpdateAddToCart,
} from '../../lib/graphql';
import { useUser } from '../../lib/util';

const Book = ({ history }) => {
    const { id } = useParams();
    const isLoggedIn = useUser() != null;

    const [addToCart, { addToCartLoading }] = useMutation(
        ADD_TO_CART_MUTATION,
        {
            variables: {
                bookId: id,
            },
            update(cache, payload) {
                alertify.success('Added to cart');
                cacheUpdateAddToCart(cache, payload);
            },
        }
    );

    const onAddToCart = () => {
        if (!isLoggedIn) {
            alertify.error('Please log in first');
            history.push('/login');
        } else {
            addToCart();
        }
    };

    const { data: relatedBooksData, loading: relatedBooksLoading } = useQuery(
        GET_RANDOM_BOOK_QUERY,
        {
            fetchPolicy: 'network-only',
            variables: { limit: 4 },
        }
    );
    const relatedBooks = relatedBooksData?.getRandomBooks;

    const { data, loading, error } = useQuery(SINGLE_BOOK_QUERY, {
        variables: { id },
    });

    const book = data?.findBookById;
    const realPrice =
        book && book.promotion
            ? (book.price * (100 - book.promotion)) / 100
            : book?.price;

    return loading ? (
        'Loading...'
    ) : (
        <>
            <Navbar />
            <BookPageStyle>
                <Container>
                    <Showcase>
                        <ShowcaseTop>
                            <ImageContainer>
                                {book.promotion != 0 && (
                                    <span className='promotion-tag'>
                                        SALE {book.promotion}%
                                    </span>
                                )}
                                <img src={book.image} alt='' />
                            </ImageContainer>
                            <ShowcaseInfo>
                                <h1>{book.title}</h1>
                                <p className='book-author'>By {book.author}</p>
                                <p>{book.shortDescription}</p>
                                <PriceBox>
                                    <div className='top'>
                                        <h4>
                                            {book.promotion !== 0 && (
                                                <strike className='promotion'>
                                                    ${book.price.toFixed(2)}
                                                </strike>
                                            )}
                                            ${realPrice.toFixed(2)}
                                        </h4>
                                    </div>
                                    <div className='bottom'>
                                        <button onClick={onAddToCart}>
                                            Add to cart
                                        </button>
                                    </div>
                                </PriceBox>
                            </ShowcaseInfo>
                        </ShowcaseTop>
                        <Description>
                            <h2>Description</h2>
                            <p>{book.description}</p>
                        </Description>
                    </Showcase>
                </Container>
                <RelatedBooks>
                    <h3>Related Products</h3>
                    <BooksContainer>
                        {relatedBooks &&
                            relatedBooks.length &&
                            relatedBooks.map((book) => (
                                <BookComponent book={book} />
                            ))}
                    </BooksContainer>
                </RelatedBooks>
            </BookPageStyle>
        </>
    );
};

export default withRouter(Book);

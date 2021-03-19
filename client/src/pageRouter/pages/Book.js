import { useParams } from 'react-router';
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
} from '../../styles/BookPageStyle';
import {
    ADD_TO_CART_MUTATION,
    GET_RANDOM_BOOK_QUERY,
    SINGLE_BOOK_QUERY,
    cacheUpdateAddToCart,
} from '../../lib/graphql';

const Book = () => {
    const { id } = useParams();

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

    return loading ? (
        'Loading...'
    ) : (
        <>
            <Navbar />
            <BookPageStyle>
                <Container>
                    <Showcase>
                        <ShowcaseTop>
                            <img src={book.image} alt='' />
                            <ShowcaseInfo>
                                <h1>{book.title}</h1>
                                <p className='book-author'>By {book.author}</p>
                                <p>{book.shortDescription}</p>
                                <PriceBox>
                                    <div className='top'>
                                        <h4>${book.price}</h4>
                                    </div>
                                    <div className='bottom'>
                                        <button onClick={addToCart}>
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

export default Book;

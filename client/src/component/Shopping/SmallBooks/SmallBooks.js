import { withRouter } from 'react-router';
import { SmallBook, BookDetails } from '../../../styles/ShoppingStyle';

const SmallBooks = ({ books, history }) => {
    const goToBook = (id) => {
        history.push('/book/' + id);
    };
    return (
        <>
            {books &&
                books.length &&
                books.map((book) => (
                    <SmallBook>
                        <img src={book.image} alt='' />
                        <BookDetails>
                            <p
                                className='book-title'
                                onClick={() => goToBook(book.id)}
                            >
                                {book.title}
                            </p>
                            <p className='book-author'>{book.author}</p>
                            <p className='book-price'>${book.price}</p>
                        </BookDetails>
                    </SmallBook>
                ))}
        </>
    );
};

export default withRouter(SmallBooks);

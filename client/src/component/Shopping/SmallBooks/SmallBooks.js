import { SmallBook, BookDetails } from '../../../styles/ShoppingStyle';

const SmallBooks = ({ books }) => {
    return (
        <>
            {books &&
                books.length &&
                books.map((book) => (
                    <SmallBook>
                        <img src={book.image} alt='' />
                        <BookDetails>
                            <p className='book-title'>{book.title}</p>
                            <p className='book-author'>{book.author}</p>
                            <p className='book-price'>${book.price}</p>
                        </BookDetails>
                    </SmallBook>
                ))}
        </>
    );
};

export default SmallBooks;

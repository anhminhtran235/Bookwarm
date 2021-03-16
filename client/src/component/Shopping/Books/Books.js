import { BooksStyle } from '../../../styles/ShoppingStyle';
import Book from '../../Book/Book';

const Books = ({ books }) => {
    return (
        <BooksStyle>
            {books &&
                books.length &&
                books.map((book) => (
                    <Book
                        image={book.image}
                        title={book.title}
                        author={book.author}
                        price='22.59'
                    />
                ))}
        </BooksStyle>
    );
};

export default Books;

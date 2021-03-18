import { withRouter } from 'react-router';
import {
    BookStyle,
    BookInfo,
    ButtonGroup,
    BookButton,
} from '../../styles/BookStyle';

const Book = ({ book: { id, image, title, author, price }, history }) => {
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
                    <BookButton>Buy</BookButton>
                </ButtonGroup>
            </BookInfo>
        </BookStyle>
    );
};

export default withRouter(Book);

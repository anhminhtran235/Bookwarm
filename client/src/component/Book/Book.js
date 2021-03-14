import {
    BookStyle,
    BookInfo,
    ButtonGroup,
    BookButton,
} from '../../styles/BookStyle';

const Book = ({ id, image, title, author, price }) => {
    return (
        <BookStyle>
            <img src={image} alt='' />
            <BookInfo>
                <p className='book-title'>{title}</p>
                <p className='book-author'>{author}</p>
                <p className='book-price'>${price}</p>
                <ButtonGroup>
                    <BookButton>Detail</BookButton>
                    <BookButton>Buy</BookButton>
                </ButtonGroup>
            </BookInfo>
        </BookStyle>
    );
};

export default Book;

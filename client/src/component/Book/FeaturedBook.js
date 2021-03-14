import {
    FeaturedBookStyle,
    GetBookButton,
} from '../../styles/FeaturedBookStyle';

const FeaturedBook = ({ image1, image2, title, author, description }) => {
    return (
        <FeaturedBookStyle>
            <div>
                <h4>Featured Book</h4>
                <h3>{title}</h3>
                <p className='book-author'>{author}</p>
                <p className='description'>{description}</p>
                <GetBookButton>Get This Book</GetBookButton>
            </div>
            <div>
                <img src={image1} alt='' />
            </div>
            <div>
                <img src={image2} alt='' />
            </div>
        </FeaturedBookStyle>
    );
};

export default FeaturedBook;

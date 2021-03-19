import { withRouter } from 'react-router';
import {
    FeaturedBookStyle,
    GetBookButton,
} from '../../styles/FeaturedBookStyle';

const FeaturedBook = ({
    book: { id, image, title, author, description },
    history,
}) => {
    const goToBook = () => {
        history.push('/book/' + id);
    };

    return (
        <FeaturedBookStyle>
            <div>
                <h4>Featured Book</h4>
                <h3>{title}</h3>
                <p className='book-author'>{author}</p>
                <p className='description'>{description}</p>
                <GetBookButton onClick={goToBook}>Get This Book</GetBookButton>
            </div>
            <div>
                <img src={image} alt='' />
            </div>
        </FeaturedBookStyle>
    );
};

export default withRouter(FeaturedBook);

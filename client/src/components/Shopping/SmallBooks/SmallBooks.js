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
                books.map(({ id, image, title, author, price, promotion }) => {
                    const realPrice = promotion
                        ? (price * (100 - promotion)) / 100
                        : price;

                    return (
                        <SmallBook key={id}>
                            <div className='image-wrapper'>
                                {promotion != 0 && (
                                    <span className='promotion-tag'>
                                        SALE {promotion}%
                                    </span>
                                )}
                                <img src={image} alt='' />
                            </div>
                            <BookDetails>
                                <p
                                    className='book-title'
                                    onClick={() => goToBook(id)}
                                >
                                    {title}
                                </p>
                                <p className='book-author'>{author}</p>
                                <p className='book-price'>
                                    {promotion !== 0 && (
                                        <strike className='promotion'>
                                            ${price.toFixed(2)}
                                        </strike>
                                    )}
                                    ${realPrice.toFixed(2)}
                                </p>
                            </BookDetails>
                        </SmallBook>
                    );
                })}
        </>
    );
};

export default withRouter(SmallBooks);

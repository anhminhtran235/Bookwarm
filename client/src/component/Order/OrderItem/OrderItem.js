import { withRouter } from 'react-router';
import { OrderItemStyle } from '../../../styles/OrdersStyle';

const OrderItem = ({
    orderItem: {
        quantity,
        pricePerItem,
        book: { id, title, author, description, image },
    },
    history,
}) => {
    const goToBook = () => {
        history.push('/book/' + id);
    };
    return (
        <OrderItemStyle>
            <img src={image} alt='' />
            <div className='item-info'>
                <p className='book-title' onClick={goToBook}>
                    {title}
                </p>
                <p className='book-author'>{author}</p>
            </div>
        </OrderItemStyle>
    );
};

export default withRouter(OrderItem);

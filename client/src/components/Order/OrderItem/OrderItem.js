import { withRouter } from 'react-router';
import { OrderItemStyle } from '../../../styles/OrdersStyle';

const OrderItem = ({
    orderItem: {
        quantity,
        pricePerItem,
        book: { id, title, author, image },
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
                <p className='book-info'>{author}</p>
                <p className='book-info'>Price: ${pricePerItem.toFixed(2)}</p>
                <p className='book-info'>Quantity: {quantity}</p>
                <p className='book-info'>
                    Subtotal: ${(quantity * pricePerItem).toFixed(2)}
                </p>
            </div>
        </OrderItemStyle>
    );
};

export default withRouter(OrderItem);

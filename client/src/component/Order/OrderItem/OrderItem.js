import { OrderItemStyle } from '../../../styles/OrdersStyle';

const OrderItem = ({
    orderItem: { quantity, pricePerItem, title, author, image },
}) => {
    return (
        <OrderItemStyle>
            <img src={image} alt='' />
            <div className='item-info'>
                <p className='book-title'>{title}</p>
                <p className='book-author'>{author}</p>
            </div>
        </OrderItemStyle>
    );
};

export default OrderItem;

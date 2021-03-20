import { epochToFormattedDate } from '../../lib/util';
import { OrderStyle } from '../../styles/OrdersStyle';
import OrderItem from './OrderItem/OrderItem';

const Order = ({ order: { orderItems, createdAt } }) => {
    const total = orderItems.reduce(
        (sum, item) => sum + item.quantity * item.pricePerItem,
        0
    );
    return (
        <OrderStyle>
            <div className='top'>
                <div className='inner'>
                    <div className='info-group'>
                        <p>Purchase date</p>
                        <p>{epochToFormattedDate(createdAt)}</p>
                    </div>
                    <div className='info-group'>
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                {orderItems &&
                    orderItems.length &&
                    orderItems.map((item) => <OrderItem orderItem={item} />)}
            </div>
        </OrderStyle>
    );
};

export default Order;

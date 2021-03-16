import { OrderStyle } from '../../styles/OrdersStyle';
import OrderItem from './OrderItem/OrderItem';

const Order = ({ order: { orderItems, createdAt } }) => {
    return (
        <OrderStyle>
            <div className='top'>
                <div className='inner'>
                    <div className='info-group'>
                        <p>Purchase date</p>
                        <p>March 9, 2021</p>
                    </div>
                    <div className='info-group'>
                        <p>Total</p>
                        <p>$25.79</p>
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

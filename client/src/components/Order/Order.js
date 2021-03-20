import styled from 'styled-components';

import OrderItem from './OrderItem/OrderItem';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    > div {
        display: flex;
        flex-direction: row;
        margin-bottom: 40px;
    }
    > div:last-child {
        margin-bottom: 0px;
    }
`;

const TotalPrice = styled.h2`
    text-align: right;
    padding-right: 20px;
`;

const Order = ({ order: { createdAt, orderItems } }) => {
    const total = orderItems.reduce(
        (sum, item) => sum + item.quantity * item.pricePerItem,
        0
    );
    return (
        <div className='mt-5'>
            <h2>Order placed on {createdAt}</h2>
            <Container>
                {orderItems.map((item) => (
                    <OrderItem orderItem={item} key={item.id} />
                ))}
            </Container>
            <TotalPrice>Total: ${total.toFixed(2)}</TotalPrice>
        </div>
    );
};

export default Order;

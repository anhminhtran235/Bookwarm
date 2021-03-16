import Navbar from '../../component/Navbar/Navbar';
import Order from '../../component/Order/Order';
import { Wrapper, Container } from '../../styles/OrdersStyle';

const Orders = () => {
    const orderItem = {
        image:
            'https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg',
        title: 'Big Magic',
        author: 'Elizabeth Gilbert',
        pricePerItem: '22.59',
        quantity: 2,
    };
    const orderItems = [];
    for (let i = 0; i < 4; i++) {
        orderItems.push({ ...orderItem });
    }
    const orders = [];
    for (let i = 0; i < 3; i++) {
        orders.push({ orderItems, createdAt: Date.now() });
    }
    return (
        <>
            <Navbar />
            <Wrapper>
                <Container>
                    <h1>Your orders</h1>
                    {orders &&
                        orders.length &&
                        orders.map((order) => <Order order={order} />)}
                </Container>
            </Wrapper>
        </>
    );
};

export default Orders;

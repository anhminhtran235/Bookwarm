import { useQuery } from '@apollo/client';

import Navbar from '../../component/Navbar/Navbar';
import Order from '../../component/Order/Order';
import { Wrapper, Container } from '../../styles/OrdersStyle';
import { GET_ORDERS_QUERY } from '../../lib/graphql';

const Orders = () => {
    const { data, loading, error } = useQuery(GET_ORDERS_QUERY);
    const orders = data?.getMe?.orders;

    return loading ? (
        'Loading...'
    ) : (
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

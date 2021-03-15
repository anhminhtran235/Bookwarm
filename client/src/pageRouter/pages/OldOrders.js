import { useQuery } from '@apollo/client';

import Order from '../../components/Order/Order';
import { GET_ORDERS_QUERY } from '../../lib/graphql';

const Orders = () => {
    const { data, loading, error } = useQuery(GET_ORDERS_QUERY);
    const orders = data?.getMe?.orders;

    if (error) {
        return <h1>Something went wrong. Please try again later</h1>;
    }

    return loading ? (
        'Loading...'
    ) : (
        <>{orders && orders.map((order) => <Order order={order} />)}</>
    );
};

export default Orders;

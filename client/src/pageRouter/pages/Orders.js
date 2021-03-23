import { useQuery } from '@apollo/client';

import Order from '../../components/Order/Order';
import { Wrapper, Container } from '../../styles/OrdersStyle';
import { GET_ORDERS_QUERY } from '../../lib/graphql';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../components/Loader/Loader';

const NoOrderWrapper = styled.div`
    .link {
        color: var(--lighter-blue);
    }
`;

const Orders = () => {
    const { data, loading, error } = useQuery(GET_ORDERS_QUERY);
    const orders = data?.getMe?.orders;

    return loading ? (
        <Loader />
    ) : (
        <>
            <Wrapper>
                <Container>
                    <h1>Your orders</h1>
                    {orders &&
                        orders.length > 0 &&
                        orders.map((order) => (
                            <Order key={order.id} order={order} />
                        ))}
                    {orders && orders.length === 0 && (
                        <NoOrderWrapper>
                            <p>
                                You don't have any order.{' '}
                                <Link class='link' to={'/shopping'}>
                                    Shop now
                                </Link>
                            </p>
                        </NoOrderWrapper>
                    )}
                </Container>
            </Wrapper>
        </>
    );
};

export default Orders;

import styled from 'styled-components';

import Navbar from '../../component/Navbar/Navbar';
import { FlexColumn, FlexRow } from '../../styles/common/UtilStyle';

const Wrapper = styled.div`
    padding-top: 80px;
    min-height: 100vh;
    h1 {
        margin-bottom: 20px;
    }
`;

const Container = styled.div`
    margin-top: 20px;
    padding: 0px var(--container-padding);
`;

const OrdersStyles = styled(FlexColumn)``;

const Order = styled(FlexColumn)`
    align-items: flex-start;
    border: 1px solid var(--darker-grey);
    border-radius: 5px;
    width: 100%;
    margin-bottom: 20px;

    .top {
        width: 100%;
        background: var(--lighter-grey);
        padding: 20px;
        .inner {
            display: flex;
        }
        p {
            margin: 0;
        }
        .info-group {
            margin-right: 20px;
        }
    }

    .bottom {
        padding: 20px;
    }
`;

const OrderItem = styled(FlexRow)`
    margin-top: 10px;
    img {
        width: 50px;
    }
    p {
        margin: 0;
    }
    .item-info {
        margin-left: 15px;
        .book-title {
            color: var(--lighter-blue);
            :hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
        .book-author {
            font-style: italic;
            font-size: 16px;
        }
    }
`;

const Orders = () => {
    return (
        <>
            <Navbar />
            <Wrapper>
                <Container>
                    <h1>Your orders</h1>
                    <OrdersStyles>
                        <Order>
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
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                            </div>
                        </Order>
                        <Order>
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
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                            </div>
                        </Order>
                        <Order>
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
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                                <OrderItem>
                                    <img
                                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                        alt=''
                                    />
                                    <div className='item-info'>
                                        <p className='book-title'>
                                            Big Magic: Creative living beyond
                                            fear
                                        </p>
                                        <p className='book-author'>
                                            Elizabeth Gilbert
                                        </p>
                                    </div>
                                </OrderItem>
                            </div>
                        </Order>
                    </OrdersStyles>
                </Container>
            </Wrapper>
        </>
    );
};

export default Orders;

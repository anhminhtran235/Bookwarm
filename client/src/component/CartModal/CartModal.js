import styled from 'styled-components';
import { FlexRow } from '../../styles/common/UtilStyle';

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 10px 30px;
    color: var(--darker-black);
    transform: translate(-50%, ${(props) => (props.show ? '-50%' : '-200%')});
    transition: 0.5s ease-out;
    width: 650px;
    height: 450px;
    z-index: 100;
    background: white;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 30%);
    h2 {
        text-align: center;
        margin: auto;
        font-size: 35px;
        font-weight: bold;
    }
    border: 10px solid var(--lighter-blue);
    border-radius: 5px;

    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0;
    }
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: 0.5s ease-out;
    z-index: ${(props) => (props.show ? 99 : -100)};
    opacity: ${(props) => (props.show ? 0.7 : 0)};
    background: grey;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    margin-top: 10px;
`;

const ItemImage = styled.img`
    height: 7rem;
    width: 5rem;
    object-fit: fill;
`;

const InfoAndOptions = styled.div`
    padding-left: 20px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    p {
        margin: 0;
    }
    .book-title {
        color: var(--darker-black);
    }
    .info {
        font-size: 16px;
        font-style: italic;
    }
`;

const ItemOptions = styled.div`
    display: flex;
    align-items: center;
    .minus {
        padding-left: 13px;
        padding-right: 13px;
    }
`;

const Button = styled.button`
    padding: 3px 10px;
    color: white;
    background: var(--lighter-blue);
    border: none;
    border-radius: 5px;
`;

const TotalPrice = styled.div`
    text-align: right;
    font-size: 25px;
    font-weight: bold;
`;

const CheckoutButton = styled.button`
    width: 100%;
    color: white;
    background: var(--orange);
    border: none;
    padding: 5px 0px;
    border-radius: 5px;
`;

const Form = styled(FlexRow)`
    input {
        :focus {
            outline: none;
        }
        margin-right: 25px;
    }
`;

const CartModal = () => {
    const show = false;
    return (
        <>
            <Backdrop show={show} />
            <Modal show={show}>
                <h2>My Cart</h2>
                <Item>
                    <ItemImage
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt='Book image'
                    />
                    <InfoAndOptions>
                        <div>
                            <p className='book-title'>
                                Big Magic: Creative living beyond fear
                            </p>
                            <p className='info'>Price: $25.59</p>
                            <p className='info'>Quantity: 1</p>
                            <p className='info'>Subtotal: $25.59</p>
                        </div>
                        <ItemOptions>
                            <Button className='mr-2 minus'>-</Button>1
                            <Button className='ml-2 plus'>+</Button>
                        </ItemOptions>
                    </InfoAndOptions>
                </Item>
                <Item>
                    <ItemImage
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt='Book image'
                    />
                    <InfoAndOptions>
                        <div>
                            <p className='book-title'>
                                Big Magic: Creative living beyond fear
                            </p>
                            <p className='info'>Price: $25.59</p>
                            <p className='info'>Quantity: 1</p>
                            <p className='info'>Subtotal: $25.59</p>
                        </div>
                        <ItemOptions>
                            <Button className='mr-2 minus'>-</Button>1
                            <Button className='ml-2 plus'>+</Button>
                        </ItemOptions>
                    </InfoAndOptions>
                </Item>
                <Item>
                    <ItemImage
                        src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                        alt='Book image'
                    />
                    <InfoAndOptions>
                        <div>
                            <p className='book-title'>
                                Big Magic: Creative living beyond fear
                            </p>
                            <p className='info'>Price: $25.59</p>
                            <p className='info'>Quantity: 1</p>
                            <p className='info'>Subtotal: $25.59</p>
                        </div>
                        <ItemOptions>
                            <Button className='mr-2 minus'>-</Button>1
                            <Button className='ml-2 plus'>+</Button>
                        </ItemOptions>
                    </InfoAndOptions>
                </Item>
                <TotalPrice>
                    <p className='pr-3 pb-1'>Total: $78.94</p>
                </TotalPrice>

                {/* <CheckoutButton>CHECKOUT</CheckoutButton> */}

                <Form>
                    <input
                        type='password'
                        placeholder='Re-enter your password'
                    />
                    <CheckoutButton>CHECKOUT</CheckoutButton>
                </Form>
            </Modal>
        </>
    );
};

export default CartModal;

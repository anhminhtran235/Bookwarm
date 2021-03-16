import {
    Modal,
    Backdrop,
    TotalPrice,
    Form,
    CheckoutButton,
} from '../../styles/CartModalStyle';
import CartItem from './CartItem/CartItem';

const CartModal = () => {
    const show = false;
    return (
        <>
            <Backdrop show={show} />
            <Modal show={show}>
                <h2>My Cart</h2>
                <CartItem
                    title='Big Magic: Creative living beyond fear'
                    price='25.59'
                    quantity='2'
                    image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                />
                <CartItem
                    title='Big Magic: Creative living beyond fear'
                    price='25.59'
                    quantity='2'
                    image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                />
                <CartItem
                    title='Big Magic: Creative living beyond fear'
                    price='25.59'
                    quantity='2'
                    image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                />

                <TotalPrice>
                    <p className='pr-3 pb-1'>Total: $78.94</p>
                </TotalPrice>

                <CheckoutButton>CHECKOUT</CheckoutButton>

                {/* <Form>
                    <input
                        type='password'
                        placeholder='Re-enter your password'
                    />
                    <CheckoutButton>CHECKOUT</CheckoutButton>
                </Form> */}
            </Modal>
        </>
    );
};

export default CartModal;

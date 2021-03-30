import { useCart } from '../../CartStateProvider';
import {
    NavLink,
    ItemCount,
    CartItemCountContainer,
} from '../../../styles/HeaderStyle';

const CartButton = ({ user }) => {
    const { openCart } = useCart();
    let cartItemCount = user?.cart?.reduce(
        (total, item) => total + item.quantity,
        0
    );
    return (
        <NavLink onClick={openCart} className='position-relative'>
            <CartItemCountContainer>
                Cart
                {cartItemCount != null && cartItemCount != 0 && (
                    <ItemCount>{cartItemCount}</ItemCount>
                )}
            </CartItemCountContainer>
        </NavLink>
    );
};

export default CartButton;

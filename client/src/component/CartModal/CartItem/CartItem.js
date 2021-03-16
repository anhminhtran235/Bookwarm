import {
    Item,
    ItemImage,
    InfoAndOptions,
    ItemOptions,
    Button,
} from '../../../styles/CartModalStyle';

const CartItem = ({ image, title, price, quantity }) => {
    const subTotal = price * quantity;
    return (
        <Item>
            <ItemImage src={image} />
            <InfoAndOptions>
                <div>
                    <p className='book-title'>{title}</p>
                    <p className='info'>Price: ${price}</p>
                    <p className='info'>Quantity: {quantity}</p>
                    <p className='info'>Subtotal: ${subTotal}</p>
                </div>
                <ItemOptions>
                    <Button className='mr-2 minus'>-</Button>
                    {quantity}
                    <Button className='ml-2 plus'>+</Button>
                </ItemOptions>
            </InfoAndOptions>
        </Item>
    );
};

export default CartItem;

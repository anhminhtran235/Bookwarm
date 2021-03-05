import styled from 'styled-components';

const Item = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 15px;
`;

const InfoLine = styled.div`
    padding: 0;
    margin: 0;
`;

const ItemImage = styled.img`
    height: 7rem;
    width: 5rem;
    object-fit: fill;
`;

const CartItem = ({ cartItem: { book, quantity } }) => {
    return (
        <Item>
            <ItemImage src={book.image} alt='Book image' />
            <div className='pl-3'>
                <InfoLine>{book.title}</InfoLine>
                <InfoLine>
                    ${book.price} x {quantity} = {book.price * quantity}
                </InfoLine>
            </div>
        </Item>
    );
};

export default CartItem;

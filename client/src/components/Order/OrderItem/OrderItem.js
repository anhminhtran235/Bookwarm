import styled from 'styled-components';

const Container = styled.div``;

const ItemImage = styled.img`
    height: 21rem;
    width: 15rem;
    object-fit: fill;
`;

const BookInfo = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    h1,
    h2 {
        text-align: center;
    }
    h2 {
        margin-bottom: 20px;
    }
    p {
        padding-left: 20px;
    }
`;

const OrderItem = ({
    orderItem: {
        quantity,
        pricePerItem,
        book: { title, author, image },
    },
}) => {
    return (
        <Container>
            <ItemImage src={image} alt='Book image' />
            <BookInfo>
                <h1>{title}</h1>
                <h2>By {author}</h2>
                <p>Price: ${pricePerItem}</p>
                <p>Quantity: {quantity}</p>
                <p>
                    Subtotal: ${pricePerItem} * {quantity} = $
                    {pricePerItem * quantity}
                </p>
            </BookInfo>
        </Container>
    );
};

export default OrderItem;

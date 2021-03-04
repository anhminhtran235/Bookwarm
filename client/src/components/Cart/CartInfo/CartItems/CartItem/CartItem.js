import styled from 'styled-components';

const Item = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 10px;
`;

const InfoLine = styled.div`
    padding: 0;
    margin: 0;
`;

const CartItem = () => {
    return (
        <Item>
            <img src='assets/images/Minh.jpg' alt='Minh' />
            <div className='pl-3'>
                <InfoLine>Set for life</InfoLine>
                <InfoLine>$23 x 2 = $46</InfoLine>
            </div>
        </Item>
    );
};

export default CartItem;

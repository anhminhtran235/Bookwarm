import styled from 'styled-components';

import Navbar from '../../component/Navbar/Navbar';
import Book from '../../component/Book/Book';
import { FlexColumn, FlexRow } from '../../styles/common/UtilStyle';

const ShoppingStyle = styled.div`
    padding: 0px var(--container-padding);
    padding-top: 80px;
    background: var(--lighter-grey);
`;

const MainArea = styled.div`
    padding: 100px 0px;
    display: flex;
    align-items: flex-start;
`;

const Books = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
`;

const SideBars = styled.div`
    width: 50%;
`;

const Card = styled.div`
    padding: 30px;
    h4 {
        font-size: 16px;
        font-weight: bold;
    }
    background: white;
    border-radius: 8px;
    margin-left: 40px;
    margin-bottom: 40px;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
`;

const SmallBook = styled(FlexRow)`
    justify-content: flex-start;
    margin-top: 40px;
    p {
        margin: 0;
    }
    img {
        height: 100%;
    }
    height: 100px;
`;

const BookDetails = styled(FlexColumn)`
    align-items: flex-start;
    padding-left: 30px;
    .book-title {
        font-size: 18px;
    }
    .book-author {
        font-size: 14px;
        font-style: italic;
    }
    .book-price {
        font-size: 18px;
        font-weight: bold;
        .cross-out {
            color: var(--darkest-grey);
        }
    }
`;

const Shopping = () => {
    return (
        <>
            <Navbar />
            <ShoppingStyle>
                <MainArea>
                    <Books>
                        <Book
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <Book
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <Book
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <Book
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <Book
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <Book
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                    </Books>
                    <SideBars>
                        <Card>
                            <h4>RELATED PRODUCTS</h4>
                            <SmallBook>
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                    alt=''
                                />
                                <BookDetails>
                                    <p className='book-title'>Big Magic</p>
                                    <p className='book-author'>
                                        Elizabeth Gilbert
                                    </p>
                                    <p className='book-price'>$22.59</p>
                                </BookDetails>
                            </SmallBook>
                            <SmallBook>
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                    alt=''
                                />
                                <BookDetails>
                                    <p className='book-title'>Big Magic</p>
                                    <p className='book-author'>
                                        Elizabeth Gilbert
                                    </p>
                                    <p className='book-price'>$22.59</p>
                                </BookDetails>
                            </SmallBook>
                            <SmallBook>
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                    alt=''
                                />
                                <BookDetails>
                                    <p className='book-title'>Big Magic</p>
                                    <p className='book-author'>
                                        Elizabeth Gilbert
                                    </p>
                                    <p className='book-price'>$22.59</p>
                                </BookDetails>
                            </SmallBook>
                            <SmallBook>
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                    alt=''
                                />
                                <BookDetails>
                                    <p className='book-title'>Big Magic</p>
                                    <p className='book-author'>
                                        Elizabeth Gilbert
                                    </p>
                                    <p className='book-price'>$22.59</p>
                                </BookDetails>
                            </SmallBook>
                        </Card>
                        <Card>
                            <h4>PROMOTION</h4>

                            <SmallBook>
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                    alt=''
                                />
                                <BookDetails>
                                    <p className='book-title'>Big Magic</p>
                                    <p className='book-author'>
                                        Elizabeth Gilbert
                                    </p>
                                    <p className='book-price'>
                                        <strike className='cross-out'>
                                            $22.59
                                        </strike>{' '}
                                        $18.99
                                    </p>
                                </BookDetails>
                            </SmallBook>
                            <SmallBook>
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                    alt=''
                                />
                                <BookDetails>
                                    <p className='book-title'>Big Magic</p>
                                    <p className='book-author'>
                                        Elizabeth Gilbert
                                    </p>
                                    <p className='book-price'>
                                        <strike className='cross-out'>
                                            $22.59
                                        </strike>{' '}
                                        $18.99
                                    </p>
                                </BookDetails>
                            </SmallBook>
                            <SmallBook>
                                <img
                                    src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                    alt=''
                                />
                                <BookDetails>
                                    <p className='book-title'>Big Magic</p>
                                    <p className='book-author'>
                                        Elizabeth Gilbert
                                    </p>
                                    <p className='book-price'>
                                        <strike className='cross-out'>
                                            $22.59
                                        </strike>{' '}
                                        $18.99
                                    </p>
                                </BookDetails>
                            </SmallBook>
                        </Card>
                    </SideBars>
                </MainArea>
            </ShoppingStyle>
        </>
    );
};

export default Shopping;

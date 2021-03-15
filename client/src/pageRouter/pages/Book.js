import styled from 'styled-components';

import { FlexColumn, FlexRow } from '../../styles/common/UtilStyle';
import Navbar from '../../component/Navbar/Navbar';
import BookComponent from '../../component/Book/Book';

const BookPageStyle = styled.div`
    padding-top: 80px;
`;

const Container = styled.div`
    background: var(--lighter-grey);
    padding: 40px var(--container-padding);
`;

const Showcase = styled.div`
    background: white;
    padding: 60px;
    border-radius: 8px;
`;

const ShowcaseInfo = styled(FlexColumn)`
    padding: 10px 0px;
    align-self: stretch;
    margin-left: 40px;
    justify-content: flex-start;
    align-items: flex-start;
    h1 {
        margin: 0;
    }
    .book-author {
        font-style: italic;
    }
`;

const PriceBox = styled(FlexColumn)`
    justify-content: flex-start;
    margin-top: 20px;
    border: 2px solid var(--darker-grey);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    .top {
        padding: 10px 100px;
        background: var(--lighter-grey);
    }
    .bottom {
        padding: 10px 20px;
        display: flex;
        input {
            padding: 10px;
            width: 70px;
            margin-right: 10px;
            border-radius: 5px;
        }
        button {
            padding: 0px 20px;
            background: var(--darker-black);
            color: white;
            border-radius: 50px;
        }
    }
`;

const Description = styled.div`
    margin-top: 30px;
    h2::after {
        content: '';
        margin-top: 10px;
        display: block;
        border: dashed 1px var(--darker-grey);
    }
`;

const RelatedBooks = styled(FlexColumn)`
    padding: 40px var(--container-padding);
    background: var(--lighter-grey);
    div {
        margin-right: 20px;
    }
    div :last-child {
        margin-right: 0px;
    }
    h3 {
        margin-bottom: 15px;
    }
`;

const Book = () => {
    return (
        <>
            <Navbar />
            <BookPageStyle>
                <Container>
                    <Showcase>
                        <FlexRow>
                            <img
                                src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                alt=''
                            />
                            <ShowcaseInfo>
                                <h1>Under the Dome: A Novel</h1>
                                <p className='book-author'>
                                    By Elizabeth Gilbert
                                </p>
                                <p>
                                    What can you do to save money with online
                                    shopping? You may be wondering if finding
                                    coupons and sales is time consuming. If you
                                    aren’t into that, there are other options.
                                    You simply need to heed the tips in this
                                    piece and act on them.
                                </p>
                                <PriceBox>
                                    <div className='top'>
                                        <h4>$23.49</h4>
                                    </div>
                                    <div className='bottom'>
                                        <input type='number' defaultValue='1' />
                                        <button>Add to cart</button>
                                    </div>
                                </PriceBox>
                            </ShowcaseInfo>
                        </FlexRow>
                        <Description>
                            <h2>Description</h2>
                            <p>
                                If you want to buy books online, you’ll get a
                                better deal if you get them used. Depending on
                                the condition you get them in, you may just end
                                up paying a few cents plus shipping. Make sure
                                you read through the description of the book to
                                see if there are any damages you should be aware
                                of. Be sure to read everything about the item
                                that you want to buy. A picture of a product can
                                be deceiving. They can make products look much
                                smaller or bigger that they really are. Reading
                                the description will allow you to be confident
                                in the item you are purchasing. Look into online
                                shopping clubs. Sites like ebates.com have some
                                tremendous offers. You not only find out about
                                sales going on at different sites, but they pay
                                you a percentage of your purchase when you buy
                                from those sites. It is a great way to get a
                                bonus check every four months and get the things
                                you need. Be aware of shipping order laws for
                                online merchants. The company is supposed to
                                send your order within the time frame listed in
                                its ad. By law, they have 30 days to send you
                                your order or give you an option to cancel your
                                order. If you do not receive your order within
                                this time frame, call the company to let them
                                know.
                            </p>
                        </Description>
                    </Showcase>
                </Container>
                <RelatedBooks>
                    <h3>Related Products</h3>
                    <FlexRow>
                        <BookComponent
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <BookComponent
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <BookComponent
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                        <BookComponent
                            image='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                            title='Big Magic'
                            author='Elizabeth Gilbert'
                            price='22.59'
                        />
                    </FlexRow>
                </RelatedBooks>
            </BookPageStyle>
        </>
    );
};

export default Book;

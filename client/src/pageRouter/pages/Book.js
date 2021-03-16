import { FlexRow } from '../../styles/common/UtilStyle';
import Navbar from '../../component/Navbar/Navbar';
import BookComponent from '../../component/Book/Book';
import {
    BookPageStyle,
    Container,
    Description,
    PriceBox,
    RelatedBooks,
    Showcase,
    ShowcaseInfo,
} from '../../styles/BookPageStyle';

const Book = () => {
    const book = {
        image:
            'https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg',
        title: 'Under the Dome: A Novel',
        author: 'Elizabeth Gilbert',
        shortDescription: `What can you do to save money with online
                        shopping? You may be wondering if finding
                        coupons and sales is time consuming. If you
                        aren’t into that, there are other options.
                        You simply need to heed the tips in this
                        piece and act on them.`,
        description: `If you want to buy books online, you’ll get a
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
                    know.`,
        price: 23.49,
    };
    return (
        <>
            <Navbar />
            <BookPageStyle>
                <Container>
                    <Showcase>
                        <FlexRow>
                            <img src={book.image} alt='' />
                            <ShowcaseInfo>
                                <h1>{book.title}</h1>
                                <p className='book-author'>By {book.author}</p>
                                <p>{book.shortDescription}</p>
                                <PriceBox>
                                    <div className='top'>
                                        <h4>${book.price}</h4>
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
                            <p>{book.description}</p>
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

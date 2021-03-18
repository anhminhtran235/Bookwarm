import Header from '../../component/Header/Header';
import Book from '../../component/Book/Book';
import FeaturedBook from '../../component/Book/FeaturedBook';
import { FlexRow } from '../../styles/common/UtilStyle';
import {
    PopularBooks,
    OurLibrary,
    InnerSection,
    Section,
    BooksContainer,
} from '../../styles/HomeStyle';
import bookIcon from '../../assets/icons/icons8-open-book.png';

const Home = () => {
    const book = {
        image:
            'https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg',
        title: 'Big Magic',
        author: 'Elizabeth Gilbert',
        price: '22.59',
    };
    return (
        <>
            <Header />
            <Section>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
            </Section>

            <PopularBooks>
                <h3>Popular Books</h3>
                <BooksContainer>
                    <Book book={book} />
                    <Book book={book} />
                    <Book book={book} />
                    <Book book={book} />
                </BooksContainer>
            </PopularBooks>

            <FeaturedBook
                title='The Complete Idiots Guide to Graphic Design'
                description='From advanced selectors to generated content to web
                fonts, and from gradients, shadows, and rounded corners
                to elegant animations, CSS3 hold a universe of creative
                possibilities. No one can better guide you through these
                galaxies than Dan Cederholm'
                author='Anggi Krisna'
                image1='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                image2='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
            />

            <OurLibrary>
                <h1>Browse Through Our Complete Library</h1>
                <p>Browse Collection &rarr;</p>
            </OurLibrary>

            <Section>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <h3>Tons of Books</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <h3>Hundreds of Authors</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
                <InnerSection>
                    <img src={bookIcon} alt='img' />
                    <h3>Easily Bookmarked</h3>
                    <p>
                        We stock over 200 thousand books for immediate delivery
                    </p>
                </InnerSection>
            </Section>
        </>
    );
};

export default Home;

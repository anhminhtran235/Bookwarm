import Header from '../../component/Header/Header';
import Book from '../../component/Book/Book';
import FeaturedBook from '../../component/Book/FeaturedBook';
import {
    PopularBooks,
    OurLibrary,
    InnerSection,
    Section,
    BooksContainer,
} from '../../styles/HomeStyle';
import bookIcon from '../../assets/icons/icons8-open-book.png';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_BOOK_QUERY } from '../../lib/graphql';

const Home = () => {
    const { data: popularBooksData, loading: popularBooksLoading } = useQuery(
        GET_RANDOM_BOOK_QUERY,
        {
            variables: { limit: 4 },
        }
    );
    const popularBooks = popularBooksData?.getRandomBooks;
    const { data: featureBookData, loading: featureBookLoading } = useQuery(
        GET_RANDOM_BOOK_QUERY,
        {
            variables: { limit: 1 },
        }
    );
    const featureBook = featureBookData?.getRandomBooks
        ? featureBookData.getRandomBooks[0]
        : null;
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
                    {popularBooks &&
                        popularBooks.length &&
                        popularBooks.map((book) => (
                            <Book key={book.id} book={book} />
                        ))}
                </BooksContainer>
            </PopularBooks>

            {featureBook && <FeaturedBook book={featureBook} />}

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

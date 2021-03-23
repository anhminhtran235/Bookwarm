import Header from '../../components/Header/Header';
import Book from '../../components/Book/Book';
import FeaturedBook from '../../components/Book/FeaturedBook';
import {
    PopularBooks,
    OurLibrary,
    InnerSection,
    Section,
    BooksContainer,
} from '../../styles/HomeStyle';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_BOOK_QUERY } from '../../lib/graphql';
import { withRouter } from 'react-router';

const Home = ({ history }) => {
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
    const goToShopping = () => {
        history.push('/shopping');
    };
    return (
        <>
            <Header />
            <Section>
                <InnerSection>
                    <i class='fas fa-book-open'></i>{' '}
                    <p>We stock over 2 million books for immediate delivery</p>
                </InnerSection>
                <InnerSection>
                    <i class='fas fa-truck'></i>
                    <p>2 days delivery guaranteed in more than 60 countries</p>
                </InnerSection>
                <InnerSection>
                    <i class='fas fa-undo-alt'></i>{' '}
                    <p>
                        30 days return policy free of charge. No question asks!
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
                <p onClick={goToShopping}>Browse Collection &rarr;</p>
            </OurLibrary>

            <Section>
                <InnerSection>
                    <i class='fas fa-book-reader'></i>
                    <h3>Thousands of readers</h3>
                    <p>
                        More than 5000 readers has considered Bookworm their go
                        to place
                    </p>
                </InnerSection>
                <InnerSection>
                    <i class='fas fa-pen-fancy'></i>{' '}
                    <h3>Hundreds of Authors</h3>
                    <p>
                        We have books written by more than 200 best selling
                        authors
                    </p>
                </InnerSection>
                <InnerSection>
                    <i class='fas fa-globe'></i>
                    <h3>Worldwide operation</h3>
                    <p>
                        With offices all over the globe, we ensure the best
                        customer service
                    </p>
                </InnerSection>
            </Section>
        </>
    );
};

export default withRouter(Home);

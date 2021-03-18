import { Route } from 'react-router';
import { useQuery } from '@apollo/client';

import Navbar from '../../component/Navbar/Navbar';
import Books from '../../component/Shopping/Books/Books';
import {
    ShoppingStyle,
    Card,
    MainArea,
    SideBars,
} from '../../styles/ShoppingStyle';
import Pagination from '../../component/Pagination/Pagination';
import SmallBooks from '../../component/Shopping/SmallBooks/SmallBooks';
import { GET_BOOK_PAGINATION_META_QUERY } from '../../lib/graphql';
import Loader from '../../component/Loader/Loader';

const Shopping = ({ match }) => {
    const book = {
        image:
            'https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg',
        title: 'Big Magic',
        author: 'Elizabeth Gilbert',
        price: '22.59',
    };
    const books = [];
    for (let i = 0; i < 10; i++) {
        books.push({ ...book });
    }

    const perPage = 9;

    const { data, loading, error } = useQuery(GET_BOOK_PAGINATION_META_QUERY);

    if (error) {
        return <h1>Something went wrong. Please try again later</h1>;
    }

    return loading ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <ShoppingStyle>
                <Pagination
                    perPage={perPage}
                    bookCount={data.getBookPaginationMeta.count}
                />
                <MainArea>
                    <Route
                        path={`${match.path}/:page`}
                        render={(props) => (
                            <Books perPage={perPage} {...props} />
                        )}
                    />
                    <SideBars>
                        <Card>
                            <h4>RELATED PRODUCTS</h4>
                            <SmallBooks books={books.slice(0, 4)} />
                        </Card>
                        <Card>
                            <h4>PROMOTION</h4>
                            <SmallBooks books={books.slice(0, 3)} />
                        </Card>
                    </SideBars>
                </MainArea>
            </ShoppingStyle>
        </>
    );
};

export default Shopping;

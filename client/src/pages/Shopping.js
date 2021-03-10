import { Route } from 'react-router';
import { useQuery } from '@apollo/client';

import PaginationBar from '../components/PaginationBar';
import { GET_BOOK_PAGINATION_META_QUERY } from '../lib/graphql';
import Books from '../components/Books/Books';

const Shopping = ({ match }) => {
    const perPage = 6;

    const { data, loading, error } = useQuery(GET_BOOK_PAGINATION_META_QUERY);

    if (error) {
        return <h1>Something went wrong. Please try again later</h1>;
    }

    return loading ? (
        'Loading...'
    ) : (
        <div>
            <PaginationBar
                perPage={perPage}
                bookCount={data.getBookPaginationMeta.count}
            />
            <Route
                path={`${match.path}/:page`}
                render={(props) => <Books perPage={perPage} {...props} />}
            />
        </div>
    );
};

export default Shopping;

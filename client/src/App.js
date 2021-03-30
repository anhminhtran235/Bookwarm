import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.css';
import { useQuery } from '@apollo/client';
import alertify from 'alertifyjs';

import './App.css';
import Page from './components/Page';
import PageRouter from './pageRouter/PageRouter';
import CartModal from './components/Cart/CartModal/CartModal';
import { GET_ME_QUERY } from './lib/graphql';
import Loader from './components/Loader/Loader';

function App() {
    const { loading, error } = useQuery(GET_ME_QUERY);
    if (error) {
        alertify.error('Something went wrong. Please try again later');
        return null;
    }

    return loading ? (
        <Loader />
    ) : (
        <Page>
            <CartModal />
            <PageRouter />
        </Page>
    );
}

export default App;

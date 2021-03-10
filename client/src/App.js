import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import './App.css';
import Page from './components/Page';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import Sell from './pages/Sell';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Book from './pages/Book';
import EditBook from './pages/EditBook';
import CartModal from './components/Cart/CartModal';
import { GET_ME_QUERY } from './lib/graphql';

function App() {
    const { data, loading, error } = useQuery(GET_ME_QUERY);
    if (error) {
        return <h1>Something went wrong. Please try again later</h1>;
    }

    return loading ? (
        <p>Loading...</p>
    ) : (
        <Page>
            <Container>
                <CartModal></CartModal>
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route
                        path='/shopping'
                        exact
                        render={() => <Redirect to='/shopping/1' />}
                    ></Route>
                    <PrivateRoute
                        path='/shopping'
                        component={Shopping}
                    ></PrivateRoute>
                    <PrivateRoute
                        path='/sell'
                        exact
                        component={Sell}
                    ></PrivateRoute>
                    <PrivateRoute
                        path='/account'
                        exact
                        component={Account}
                    ></PrivateRoute>
                    <Route path='/login' exact component={Login}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <PrivateRoute
                        path='/orders'
                        exact
                        component={Orders}
                    ></PrivateRoute>
                    <Route path='/book/:id' exact component={Book}></Route>
                    <Route
                        path='/edit/book/:id'
                        exact
                        component={EditBook}
                    ></Route>
                    <Route
                        path='/'
                        render={() => <Redirect to='/shopping' />}
                    ></Route>
                </Switch>
            </Container>
        </Page>
    );
}

export default App;

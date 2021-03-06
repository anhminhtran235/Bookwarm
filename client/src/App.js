import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

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
import { authenticate, deauthenticate } from './redux/actions/auth';

function App({ isLoggedIn, authenticate, deauthenticate }) {
    const hasNotAuthenticatedWithServer = isLoggedIn == null;
    const { loading, error, data } = useQuery(GET_ME_QUERY, {
        fetchPolicy: hasNotAuthenticatedWithServer
            ? 'network-only'
            : 'cache-only',
    });
    useEffect(() => {
        if (data && isLoggedIn == null) {
            if (data.getMe) {
                authenticate(data.getMe);
            } else {
                deauthenticate();
            }
        }
    }, [authenticate, deauthenticate, data, isLoggedIn]);
    return loading ? (
        <p>Loading...</p>
    ) : (
        <Page>
            <Container>
                <CartModal></CartModal>
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <PrivateRoute
                        path='/shopping'
                        exact
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

const mapStateToProps = (state) => ({
    isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    authenticate: (user) => dispatch(authenticate(user)),
    deauthenticate: () => dispatch(deauthenticate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

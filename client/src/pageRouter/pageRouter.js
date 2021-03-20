import { Redirect, Switch } from 'react-router-dom';

import CustomRoute from '../components/Route/CustomRoute';
import PrivateRoute from '../components/Route/PrivateRoute';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import Sell from './pages/Sell';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Book from './pages/Book';
import EditBook from './pages/EditBook';

const PageRouter = () => {
    return (
        <Switch>
            <CustomRoute path='/' exact component={Home}></CustomRoute>
            <CustomRoute path='/login' exact component={Login}></CustomRoute>
            <CustomRoute
                path='/register'
                exact
                component={Register}
            ></CustomRoute>
            <CustomRoute
                path='/shopping'
                exact
                render={() => <Redirect to='/shopping/1' />}
            ></CustomRoute>

            <CustomRoute path='/shopping' component={Shopping}></CustomRoute>
            <PrivateRoute path='/sell' exact component={Sell}></PrivateRoute>
            <PrivateRoute
                path='/account'
                exact
                component={Account}
            ></PrivateRoute>
            <PrivateRoute
                path='/orders'
                exact
                component={Orders}
            ></PrivateRoute>
            <CustomRoute path='/book/:id' exact component={Book}></CustomRoute>
            <PrivateRoute
                path='/edit/book/:id'
                exact
                component={EditBook}
            ></PrivateRoute>
            <CustomRoute
                path='/'
                render={() => <Redirect to='/shopping' />}
            ></CustomRoute>
        </Switch>
    );
};

export default PageRouter;

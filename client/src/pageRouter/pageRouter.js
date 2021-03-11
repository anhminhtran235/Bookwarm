import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
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
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/register' exact component={Register}></Route>
            <Route
                path='/shopping'
                exact
                render={() => <Redirect to='/shopping/1' />}
            ></Route>

            <PrivateRoute path='/shopping' component={Shopping}></PrivateRoute>
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
            <Route path='/book/:id' exact component={Book}></Route>
            <PrivateRoute
                path='/edit/book/:id'
                exact
                component={EditBook}
            ></PrivateRoute>
            <Route path='/' render={() => <Redirect to='/shopping' />}></Route>
        </Switch>
    );
};

export default PageRouter;

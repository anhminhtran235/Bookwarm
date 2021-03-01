import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';

import './App.css';
import Page from './components/Page';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <Page>
            <Container>
                <Route path='/' exact component={Home}></Route>
                <PrivateRoute
                    path='/shopping'
                    exact
                    component={Shopping}
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
            </Container>
        </Page>
    );
}

export default App;

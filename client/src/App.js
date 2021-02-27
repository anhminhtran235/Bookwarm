import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';

import './App.css';
import Page from './components/Page';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import Account from './pages/Account';
import BuyerLogin from './pages/BuyerLogin';
import BuyerRegister from './pages/BuyerRegister';
import SellerLogin from './pages/SellerLogin';
import SellerRegister from './pages/SellerRegister';
import Orders from './pages/Orders';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <Page>
            <Container>
                <Route path='/' exact component={Home}></Route>
                <Route path='/shopping' exact component={Shopping}></Route>
                <Route path='/account' exact component={Account}></Route>
                <Route path='/buyer-login' exact component={BuyerLogin}></Route>
                <Route
                    path='/buyer-register'
                    exact
                    component={BuyerRegister}
                ></Route>
                <Route
                    path='/seller-login'
                    exact
                    component={SellerLogin}
                ></Route>
                <Route
                    path='/seller-register'
                    exact
                    component={SellerRegister}
                ></Route>
                <Route path='/orders' exact component={Orders}></Route>
            </Container>
        </Page>
    );
}

export default App;

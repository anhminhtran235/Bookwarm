import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { useUser } from '../../../lib/util';
import LogoutButton from './LogoutButton/LogoutButton';
import CartButton from './CartButton/CartButton';

const MyNavbar = () => {
    const user = useUser();
    const isLoggedIn = user != null;

    let leftNav = null;
    let rightNav = null;
    if (isLoggedIn) {
        leftNav = (
            <Nav className='mr-auto'>
                <Nav.Link as={Link} to='/shopping'>
                    Shopping
                </Nav.Link>
                <Nav.Link as={Link} to='/sell'>
                    Sell
                </Nav.Link>
                <Nav.Link as={Link} to='/orders'>
                    Orders
                </Nav.Link>
                <Nav.Link as={Link} to='/account'>
                    Account
                </Nav.Link>
                <CartButton cart={user?.cart} />
            </Nav>
        );
        rightNav = (
            <Nav className='ml-auto'>
                <LogoutButton />
            </Nav>
        );
    } else {
        rightNav = (
            <Nav className='ml-auto'>
                <Nav.Link as={Link} to='/login'>
                    Log in
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                    Register
                </Nav.Link>
            </Nav>
        );
    }

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='/'>Bookworm</Navbar.Brand>
                {leftNav}
                {rightNav}
            </Container>
        </Navbar>
    );
};

export default withRouter(MyNavbar);

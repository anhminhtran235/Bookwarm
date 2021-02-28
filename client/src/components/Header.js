import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href='/'>Bookworm</Navbar.Brand>
                    <Nav className='mr-auto'>
                        <Nav.Link as={Link} to='/shopping'>
                            Shopping
                        </Nav.Link>
                        <Nav.Link as={Link} to='/orders'>
                            Orders
                        </Nav.Link>
                        <Nav.Link as={Link} to='/account'>
                            Account
                        </Nav.Link>
                        <Nav.Link as={Link} to='/cart'>
                            My Cart
                        </Nav.Link>
                        <Nav.Link>Sign out</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type='text'
                            placeholder='Search for books'
                            className='mr-sm-2'
                        />
                        <Button variant='outline-info'>Search</Button>
                    </Form>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;

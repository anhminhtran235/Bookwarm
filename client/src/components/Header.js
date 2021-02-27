import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';

const Header = () => {
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href='/'>Bookworm</Navbar.Brand>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/shopping'>Shopping</Nav.Link>
                        <Nav.Link href='/orders'>Orders</Nav.Link>
                        <Nav.Link href='/account'>Account</Nav.Link>
                        <Nav.Link href='/cart'>My Cart</Nav.Link>
                        <Nav.Link>Sign out</Nav.Link>
                        <Nav.Link href='/seller-register'>
                            Become a seller
                        </Nav.Link>
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

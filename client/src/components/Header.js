import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useLazyQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import alertify from 'alertifyjs';

import { useUser } from '../lib/util';
import Search from '../components/Search';
import { GET_ME_QUERY, LOGOUT_MUTATION } from '../lib/graphql';
import { useCart } from './CartStateProvider';

const ItemCount = styled.div`
    position: absolute;
    top: -7px;
    right: -6px;
    background: red;
    border-radius: 80%;
    padding: 2px 4px;
    color: white;
`;

const SearchWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid black;
`;

const Header = ({ history }) => {
    const [removeCookie] = useMutation(LOGOUT_MUTATION);
    const [refetchUser] = useLazyQuery(GET_ME_QUERY, {
        fetchPolicy: 'network-only',
    });

    const user = useUser();

    const { openCart } = useCart();

    const isLoggedIn = user != null;
    let cartItemCount = user?.cart?.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const logout = async () => {
        alertify.error('Logged out');
        await removeCookie();
        await refetchUser();
        history.push('/');
    };

    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href='/'>Bookworm</Navbar.Brand>
                    <Nav className='mr-auto'>
                        {isLoggedIn && (
                            <Nav.Link as={Link} to='/shopping'>
                                Shopping
                            </Nav.Link>
                        )}
                        {isLoggedIn && (
                            <Nav.Link as={Link} to='/sell'>
                                Sell
                            </Nav.Link>
                        )}
                        {isLoggedIn && (
                            <Nav.Link as={Link} to='/orders'>
                                Orders
                            </Nav.Link>
                        )}
                        {isLoggedIn && (
                            <Nav.Link as={Link} to='/account'>
                                Account
                            </Nav.Link>
                        )}
                        {isLoggedIn && (
                            <Nav.Link
                                as={Button}
                                onClick={openCart}
                                className='position-relative'
                            >
                                My cart
                                {cartItemCount !== 0 && (
                                    <ItemCount>{cartItemCount}</ItemCount>
                                )}
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav className='ml-auto'>
                        {isLoggedIn && (
                            <Button onClick={logout}>Log out</Button>
                        )}
                        {!isLoggedIn && (
                            <Nav.Link as={Link} to='/login'>
                                Log in
                            </Nav.Link>
                        )}
                        {!isLoggedIn && (
                            <Nav.Link as={Link} to='/register'>
                                Register
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
            <SearchWrapper>
                <Search />
            </SearchWrapper>
        </>
    );
};

export default withRouter(Header);

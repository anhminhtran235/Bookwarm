import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useMutation } from '@apollo/client';

import { deauthenticate } from '../redux/actions/auth';
import gql from 'graphql-tag';

const Header = ({ isLoggedIn, deauthenticate, history }) => {
    const [removeCookie] = useMutation(LOGOUT_MUTATION);
    const logout = () => {
        deauthenticate();
        removeCookie();
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
                            <Nav.Link as={Link} to='/cart'>
                                My cart
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
        </>
    );
};

const LOGOUT_MUTATION = gql`
    mutation {
        logout
    }
`;

const mapStateToProps = (state) => ({
    isLoggedIn: state.authReducer.isLoggedIn,
});

export default connect(mapStateToProps, { deauthenticate })(withRouter(Header));

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Nav, NavLink, Outer } from '../../styles/HeaderStyle';

const Navbar = ({ transparentInitially }) => {
    const [navState, setNavState] = useState({
        showNavBg: transparentInitially ? false : true,
        outerStyle: {},
    });

    useEffect(() => {
        let scrolled = false;
        if (transparentInitially) {
            window.addEventListener('scroll', (e) => {
                if (window.pageYOffset > 80) {
                    if (scrolled) {
                        setNavState({
                            ...navState,
                            showNavBg: true,
                        });
                    } else {
                        setNavState({
                            showNavBg: true,
                            outerStyle: { transform: 'translateY(-80px)' },
                        });
                        setTimeout(() => {
                            setNavState({
                                showNavBg: true,
                                outerStyle: { transform: 'translateY(0px)' },
                            });
                            scrolled = true;
                        }, 500);
                    }
                } else {
                    setNavState({
                        showNavBg: false,
                        outerStyle: {},
                    });
                    scrolled = false;
                }
            });
        }
    }, []);
    return (
        <Outer showNavBg={navState.showNavBg} style={navState.outerStyle}>
            <Container>
                <Nav showNavBg={navState.showNavBg}>
                    <a href='/' className='special-text logo'>
                        Bookworm
                    </a>
                    <ul>
                        <li>
                            <NavLink
                                as={Link}
                                to='/shopping'
                                showNavBg={navState.showNavBg}
                            >
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                as={Link}
                                to='/sell'
                                showNavBg={navState.showNavBg}
                            >
                                Sell
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                as={Link}
                                to='/orders'
                                showNavBg={navState.showNavBg}
                            >
                                Order
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                as={Link}
                                to='/account'
                                showNavBg={navState.showNavBg}
                            >
                                Account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink showNavBg={navState.showNavBg}>
                                My Cart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink showNavBg={navState.showNavBg}>
                                Logout
                            </NavLink>
                        </li>
                        {/* <NavLink>Login</NavLink>
            <NavLink>Register</NavLink> */}
                    </ul>
                </Nav>
            </Container>
        </Outer>
    );
};

export default Navbar;

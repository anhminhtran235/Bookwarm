import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Container,
    Menu,
    Nav,
    NavLink,
    NavLinksContainer,
    Outer,
} from '../../styles/HeaderStyle';
import BurgerButton from './BurgerButton/BurgerButton';
import Search from '../Search/Search';
import CartButton from './CartButton/CartButton';
import { useUser } from '../../lib/util';
import LogoutButton from './LogoutButton/LogoutButton';

const Navbar = ({ transparentInitially }) => {
    const user = useUser();
    const isLoggedIn = user != null;

    const [navState, setNavState] = useState({
        showNavBg: transparentInitially ? false : true,
        dropdownNav: false,
        outerStyle: {},
    });

    useEffect(() => {
        setNavState({
            ...navState,
            showNavBg: transparentInitially ? false : true,
        });
    }, [transparentInitially]);

    const [searchState, setSearchState] = useState({ on: false });

    const toggleDropdownNav = () => {
        setNavState((prevState) => ({
            ...prevState,
            outerStyle: { ...prevState.outerStyle },
            dropdownNav: !prevState.dropdownNav,
        }));
    };

    const searchToggled = (isSearchOn) => {
        setSearchState({ on: isSearchOn });
    };

    useEffect(() => {
        let scrolled = false;
        const eventHandler = (e) => {
            if (window.pageYOffset > 40) {
                if (scrolled) {
                    setNavState((prevState) => ({
                        ...prevState,
                        outerStyle: { ...prevState.outerStyle },
                        dropdownNav: false,
                        showNavBg: true,
                    }));
                } else {
                    setNavState((prevState) => ({
                        ...prevState,
                        dropdownNav: false,
                        showNavBg: true,
                        outerStyle: { transform: 'translateY(-80px)' },
                    }));
                    setTimeout(() => {
                        setNavState((prevState) => ({
                            ...prevState,
                            dropdownNav: false,
                            showNavBg: true,
                            outerStyle: { transform: 'translateY(0px)' },
                        }));
                        scrolled = true;
                    }, 500);
                }
            } else {
                setNavState((prevState) => ({
                    ...prevState,
                    dropdownNav: false,
                    showNavBg: false,
                    outerStyle: {},
                }));
                scrolled = false;
            }
        };

        if (transparentInitially) {
            window.addEventListener('scroll', eventHandler);
        }

        return () => window.removeEventListener('scroll', eventHandler);
    }, [transparentInitially]);

    return (
        <Outer showNavBg={navState.showNavBg} style={navState.outerStyle}>
            <Container>
                <Nav showNavBg={navState.showNavBg} searchOn={searchState.on}>
                    <a
                        href='/'
                        className={
                            searchState.on
                                ? 'special-text logo disable'
                                : 'special-text logo'
                        }
                    >
                        Bookworm
                    </a>
                    <Menu>
                        <NavLinksContainer
                            className={
                                navState.dropdownNav ? 'dropdown-nav' : ''
                            }
                        >
                            <NavLink as={Link} to='/shopping'>
                                Shop
                            </NavLink>
                            {isLoggedIn && (
                                <NavLink as={Link} to='/sell'>
                                    Sell
                                </NavLink>
                            )}
                            {isLoggedIn && (
                                <NavLink as={Link} to='/orders'>
                                    Orders
                                </NavLink>
                            )}
                            {isLoggedIn && (
                                <NavLink as={Link} to='/account'>
                                    Account
                                </NavLink>
                            )}
                            <CartButton
                                showNavBg={navState.showNavBg}
                                user={user}
                            >
                                My Cart
                            </CartButton>
                            {isLoggedIn && (
                                <LogoutButton showNavBg={navState.showNavBg}>
                                    Logout
                                </LogoutButton>
                            )}
                            {!isLoggedIn && (
                                <NavLink as={Link} to='/login'>
                                    Login
                                </NavLink>
                            )}
                            {!isLoggedIn && (
                                <NavLink as={Link} to='/register'>
                                    Register
                                </NavLink>
                            )}
                        </NavLinksContainer>
                        <BurgerButton
                            toggleDropdown={toggleDropdownNav}
                            open={navState.dropdownNav}
                        />
                        <Search searchToggled={searchToggled} />
                    </Menu>
                </Nav>
            </Container>
        </Outer>
    );
};

export default Navbar;

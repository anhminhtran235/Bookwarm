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

const Navbar = ({ transparentInitially }) => {
    const [navState, setNavState] = useState({
        showNavBg: transparentInitially ? false : true,
        dropdownNav: false,
        outerStyle: {},
    });

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
        if (transparentInitially) {
            window.addEventListener('scroll', (e) => {
                if (window.pageYOffset > 80) {
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
            });
        }
    }, []);
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
                            <NavLink
                                as={Link}
                                to='/shopping'
                                showNavBg={navState.showNavBg}
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                as={Link}
                                to='/sell'
                                showNavBg={navState.showNavBg}
                            >
                                Sell
                            </NavLink>
                            <NavLink
                                as={Link}
                                to='/orders'
                                showNavBg={navState.showNavBg}
                            >
                                Orders
                            </NavLink>
                            <NavLink
                                as={Link}
                                to='/account'
                                showNavBg={navState.showNavBg}
                            >
                                Account
                            </NavLink>
                            <NavLink showNavBg={navState.showNavBg}>
                                My Cart
                            </NavLink>
                            <NavLink showNavBg={navState.showNavBg}>
                                Logout
                            </NavLink>
                            {/* <NavLink>Login</NavLink>
            <NavLink>Register</NavLink> */}
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

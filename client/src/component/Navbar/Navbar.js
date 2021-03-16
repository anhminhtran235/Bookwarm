import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Nav, NavLink, Outer } from '../../styles/HeaderStyle';
import { FlexRow } from '../../styles/common/UtilStyle';

const SearchBar = styled(FlexRow)`
    width: ${(props) => (props.showSearch ? '400px' : '20px')};
    transition: all 1s;
    position: relative;

    .input-wrapper {
        width: 100%;
        i {
            display: ${(props) => (props.showSearch ? 'block' : 'none')};
            position: absolute;
            top: 11px;
            right: 8px;
            color: grey;
        }
    }

    input {
        color: var(--lighter-black);
        transition: all 1s;
        width: 100%;
        opacity: ${(props) => (props.showSearch ? '100%' : '0%')};
        padding: ${(props) => (props.showSearch ? '5px 20px' : '0px')};
        border: 1px solid var(--darker-grey);
        :focus {
            outline: none;
        }
    }
    .search-icon {
        display: ${(props) => (props.showSearch ? 'none' : 'block')};
        margin-left: ${(props) => (props.showSearch ? '5px' : '0px')};
    }

    .dropdown {
        display: ${(props) => (props.showSearch ? 'block' : 'none')};
    }
`;

const Dropdown = styled.div`
    z-index: 1;
    position: absolute;
    width: 100%;
    top: 43px;
    box-shadow: 0px 3px 5px 0 rgb(0 0 0 / 30%);
    .active {
        background: var(--lighter-grey);
        border: 2px solid yellow;
        padding-left: 30px;
    }
`;

const DropdownItem = styled(FlexRow)`
    z-index: -1;
    justify-content: flex-start;
    background: white;
    color: black;
    border: 1px solid var(--lighter-grey);
    padding: 10px 20px;
    line-height: 1;
    img {
        width: 50px;
    }
    p {
        margin: 0;
    }
    .book-info {
        margin-left: 10px;
        .book-author {
            font-size: 14px;
            font-style: italic;
            margin-top: 5px;
        }
    }
`;

const Navbar = ({ transparentInitially }) => {
    const [navState, setNavState] = useState({
        showNavBg: transparentInitially ? false : true,
        outerStyle: {},
        showSearch: false,
    });

    const toggleSearch = () => {
        setNavState({
            ...navState,
            showSearch: !navState.showSearch,
        });
    };

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
                            ...navState,
                            showNavBg: true,
                            outerStyle: { transform: 'translateY(-80px)' },
                        });
                        setTimeout(() => {
                            setNavState({
                                ...navState,
                                showNavBg: true,
                                outerStyle: { transform: 'translateY(0px)' },
                            });
                            scrolled = true;
                        }, 500);
                    }
                } else {
                    setNavState({
                        ...navState,
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
                                Orders
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
                            <SearchBar showSearch={navState.showSearch}>
                                <div class='input-wrapper'>
                                    <input
                                        type='text'
                                        placeholder='Find book'
                                    />
                                    <i
                                        class='fas fa-times'
                                        onClick={toggleSearch}
                                    ></i>
                                </div>
                                <i
                                    class='fas fa-search search-icon'
                                    onClick={toggleSearch}
                                ></i>
                                <Dropdown className='dropdown'>
                                    <DropdownItem className='active'>
                                        <img
                                            src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                            alt=''
                                        />
                                        <div class='book-info'>
                                            <p class='book-title'>
                                                Big magic: Creative living
                                                without fear
                                            </p>
                                            <p class='book-author'>
                                                Elizabeth Gilbert
                                            </p>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <img
                                            src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                            alt=''
                                        />
                                        <div class='book-info'>
                                            <p class='book-title'>Big magic</p>
                                            <p class='book-author'>
                                                Elizabeth Gilbert
                                            </p>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <img
                                            src='https://images-na.ssl-images-amazon.com/images/I/91JxVjINNsL._AC_UL600_SR396,600_.jpg'
                                            alt=''
                                        />
                                        <div class='book-info'>
                                            <p class='book-title'>Big magic</p>
                                            <p class='book-author'>
                                                Elizabeth Gilbert
                                            </p>
                                        </div>
                                    </DropdownItem>
                                </Dropdown>
                            </SearchBar>
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

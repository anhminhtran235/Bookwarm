import { useEffect, useState } from 'react';

import {
    HeaderStyle,
    Button,
    Container,
    Content,
    Nav,
    NavLink,
    Outer,
} from '../../styles/HeaderStyle';

const Header = () => {
    const [navState, setNavState] = useState({
        showNavBg: false,
        navStyle: {
            position: 'relative',
        },
        divStyle: {
            width: '100%',
            height: '0px',
        },
    });

    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            if (window.pageYOffset > 80) {
                setNavState({
                    showNavBg: true,
                    navStyle: {
                        position: 'fixed',
                        top: '0px',
                    },
                    divStyle: {
                        width: '100%',
                        height: '80px',
                    },
                });
            } else {
                setNavState({
                    showNavBg: false,
                    navStyle: {
                        position: 'relative',
                    },
                    divStyle: {
                        width: '100%',
                        height: '0px',
                    },
                });
            }
        });
    }, []);
    return (
        <HeaderStyle>
            <div style={navState.divStyle}></div>
            <Outer showNavBg={navState.showNavBg} style={navState.navStyle}>
                <Container>
                    <Nav showNavBg={navState.showNavBg}>
                        <h1 className='special-text'>Bookworm</h1>
                        <ul>
                            <li>
                                <NavLink showNavBg={navState.showNavBg}>
                                    Shop
                                </NavLink>
                            </li>
                            <li>
                                <NavLink showNavBg={navState.showNavBg}>
                                    Sell
                                </NavLink>
                            </li>
                            <li>
                                <NavLink showNavBg={navState.showNavBg}>
                                    Order
                                </NavLink>
                            </li>
                            <li>
                                <NavLink showNavBg={navState.showNavBg}>
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
            <Content>
                <h1 className='special-text'>
                    Creative and Tech Training Library
                </h1>
                <p>
                    Learn to create stunning movies, games, projects and more
                    with professional video tutorials
                </p>
                <Button>Start Reading Now</Button>
            </Content>
        </HeaderStyle>
    );
};

export default Header;
